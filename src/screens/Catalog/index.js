import axios from 'axios';
import React, {useEffect, useState, createRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {IconFilter} from '../../assets';
import {NavBar} from '../../components';
import CardCatalog from '../../components/CardCatalog';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
} from '../../utils/constans';
import {API_URL} from '@env';
import ActionSheet from 'react-native-actions-sheet';
import {useIsFocused} from '@react-navigation/native';

//redux
import {useSelector} from 'react-redux';

const Catalog = ({navigation, route}) => {
  const isInitialMount = useRef(true);
  const [active, setActive] = useState('');
  const [descend, setDescend] = useState('');
  let {title, keyword} = route.params;
  const [viewall, setViewall] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const brand = useSelector((state) => state.filter.brand);
  const color = useSelector((state) => state.filter.color);
  const size = useSelector((state) => state.filter.size);
  const category = useSelector((state) => state.filter.category);
  const isFocused = useIsFocused();
  //viewall
  useEffect(() => {
    // code to run on component mount
    getViewAll();
  }, []);
  //sort
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      if (active == 'Filter') {
        getFilter();
      } else if (active == 'Customer review') {
        getSortWithReview();
      } else {
        getSorted();
      }
    }
  }, [isFocused, active]);

  const getSortWithReview = () => {
    axios
      .get(`${API_URL}/products/rating`)
      .then(({data}) => {
        console.log('Review');
        setViewall(data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSorted = () => {
    axios
      .get(`${API_URL}/products?filter=${active}&limit=10${descend}`)
      .then(({data}) => {
        //console.log(data.data.products);
        console.log('sort');
        setViewall(data.data.products);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getViewAll = () => {
    if (title === 'View All Items' || title === '' || title === undefined) {
      title = '';
    } else if (title === 'New') {
      return setActive('new');
    } else if (title === 'Popular') {
      return setActive('rating');
    }
    console.log(title);
    console.log(keyword);
    axios
      .get(
        `${API_URL}/products?limit=10&category=${title}&search=${keyword}&filter=name`,
      )
      .then(({data}) => {
        console.log('view all');
        setPageInfo(data.data.pageInfo);
        setViewall(data.data.products);
        setLoading(true);
        console.log(pageInfo.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextpage = () => {
    axios
      .get(`${API_URL}${pageInfo.nextPage}`)
      .then(({data}) => {
        setPageInfo(data.data.pageInfo);
        setViewall(data.data.products);
      })
      .catch((err) => {
        console.log(err);
        console.log('next page error');
      });
  };
  const prevpage = () => {
    axios
      .get(`${API_URL}${pageInfo.previousPage}`)
      .then(({data}) => {
        setPageInfo(data.data.pageInfo);
        setViewall(data.data.products);
      })
      .catch((err) => {
        console.log(err);
        console.log('prev page error');
      });
  };

  const specpage = (num) => {
    axios
      .get(`${API_URL}/products?page=${num}&limit=10`)
      .then(({data}) => {
        setPageInfo(data.data.pageInfo);
        setViewall(data.data.products);
      })
      .catch((err) => {
        console.log(err);
        console.log('spec page error');
      });
  };

  //console.log(pageInfo);

  const getFilter = async () => {
    let keyBrand = '';
    let keyColor = '';
    let keySize = '';
    let keyCtg = '';
    brand.forEach((el) => {
      keyBrand += `'${el}',`;
    });
    color.forEach((el) => {
      keyColor += `'${el}',`;
    });
    size.forEach((el) => {
      keySize += `'${el}',`;
    });
    category.forEach((el) => {
      keyCtg += `'${el}',`;
    });
    const newbrand = keyBrand.slice(0, -1);
    const newcolor = keyColor.slice(0, -1);
    const newsize = keySize.slice(0, -1);
    const newctg = keyCtg.slice(0, -1);
    // console.log(newbrand);
    // console.log(newcolor);
    // console.log(newsize);
    // console.log(newctg);
    if (keyBrand == '' && keyColor == '' && keySize == '' && keyCtg == '') {
      return console.log('Fill 1st');
    }
    await axios
      .get(
        `${API_URL}/products/filter?color=${newcolor}&category=${newctg}&brand=${newbrand}&size=${newsize}`,
      )
      .then((res) => {
        //console.log(res.data.data.length);
        setViewall(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        getViewAll();
      });
  };

  const actionSheetRef = createRef();

  return (
    <>
      <View style={styles.head}>
        <NavBar navigation={navigation} title={title} />
        <View style={styles.wrapfilter}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              navigation.navigate('Filter');
              setActive('Filter');
            }}>
            <IconFilter style={{marginRight: 10}} />
            <Text style={{fontFamily: FONT_LIGHT}}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text
              style={{fontFamily: FONT_LIGHT}}
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}>
              Sort
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: windowWidth * 0.04, marginVertical: 10}}>
        <ScrollView>
          {loading ? (
            viewall.length !== 0 &&
            viewall.map(
              (
                {
                  prd_id,
                  prd_name,
                  prd_brand,
                  prd_price,
                  prd_image,
                  rating_product,
                  total_review,
                },
                index,
              ) => {
                return (
                  <CardCatalog
                    key={index}
                    itemId={prd_id}
                    name={prd_name}
                    brand={prd_brand}
                    price={prd_price}
                    image={JSON.parse(prd_image)}
                    navigation={navigation}
                    rating={rating_product}
                    review={total_review}
                  />
                );
              },
            )
          ) : (
            <View style={styles.animation}>
              <ActivityIndicator size={90} color={COLOR_MAIN} />
            </View>
          )}

          <View style={styles.pagination}>
            {pageInfo.totalPage > 1 && (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {pageInfo.previousPage !== null ? (
                  <TouchableOpacity
                    onPress={() => {
                      prevpage();
                    }}>
                    <Text>Prev</Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}

                {Array.from(Array(pageInfo.totalPage)).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => specpage(index + 1)}>
                    <Text
                      style={
                        index + 1 == pageInfo.currentPage
                          ? {color: COLOR_MAIN}
                          : {color: '#000'}
                      }>
                      {index + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
                {pageInfo.nextPage !== null ? (
                  <TouchableOpacity
                    onPress={() => {
                      nextpage();
                    }}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            )}
          </View>

          <View style={styles.gap} />
        </ScrollView>
        <ActionSheet ref={actionSheetRef} actionSheetRef>
          <View style={styles.sort}>
            <Text
              style={{
                fontFamily: FONT_BOLD,
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
              }}>
              Sort by
            </Text>
            <TouchableOpacity
              style={active == 'rating' ? styles.btnsheetAct : styles.btnsheet}
              onPress={() => {
                console.log('rating');
                setActive('rating');
                actionSheetRef.current?.setModalVisible(false);
              }}>
              <Text
                style={
                  active == 'rating' ? styles.textFilterAct : styles.textFilter
                }>
                Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={active == 'new' ? styles.btnsheetAct : styles.btnsheet}
              onPress={() => {
                console.log('new');
                setActive('new');
                actionSheetRef.current?.setModalVisible(false);
              }}>
              <Text
                style={
                  active == 'new' ? styles.textFilterAct : styles.textFilter
                }>
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active == 'Customer review'
                  ? styles.btnsheetAct
                  : styles.btnsheet
              }
              onPress={() => {
                console.log('Customer review');
                setActive('Customer review');
                actionSheetRef.current?.setModalVisible(false);
              }}>
              <Text
                style={
                  active == 'Customer review'
                    ? styles.textFilterAct
                    : styles.textFilter
                }>
                Customer review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={active == 'price' ? styles.btnsheetAct : styles.btnsheet}
              onPress={() => {
                console.log('price');
                setActive('price');
                actionSheetRef.current?.setModalVisible(false);
              }}>
              <Text
                style={
                  active == 'price' ? styles.textFilterAct : styles.textFilter
                }>
                Price: lowest to high
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={active == 'priceD' ? styles.btnsheetAct : styles.btnsheet}
              onPress={() => {
                console.log('priceD');
                setActive('priceD');
                actionSheetRef.current?.setModalVisible(false);
              }}>
              <Text
                style={
                  active == 'priceD' ? styles.textFilterAct : styles.textFilter
                }>
                Price: highest to low
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </View>
    </>
  );
};

export default Catalog;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  animation: {
    //backgroundColor: 'grey',
    height: windowHeight * 0.7,
    justifyContent: 'center',
  },
  wrapfilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  head: {
    backgroundColor: '#fff',
  },
  filter: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  gap: {
    height: 100,
  },
  sort: {
    height: windowHeight * 0.5,
    marginHorizontal: windowWidth * 0.04,
    backgroundColor: '#fff',
  },
  textFilter: {
    fontFamily: FONT_LIGHT,
    fontSize: 16,
    color: 'black',
  },
  btnsheet: {
    marginVertical: 5,
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  btnsheetAct: {
    backgroundColor: COLOR_MAIN,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  textFilterAct: {
    color: '#fff',
  },
  pagination: {
    marginTop: windowHeight * 0.02,
  },
});
