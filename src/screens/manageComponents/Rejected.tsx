import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {apiGet, apiPut, getItem} from '../../utils/utils';
import urls from '../../config/urls';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Pdf from 'react-native-pdf';
import Loader from '../../component/Loader';

import {ToastMsg} from '../../utils/helperFunction';
import {useIsFocused} from '@react-navigation/native';
import CustomModel from '../../component/CustomModel';
import Icons from '../../assets/icons';

const Rejected = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [pdfUrl, setPdfUrl] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const onLoad = async () => {
    try {
      setLoading(true);
      const userID = await getItem('userId');
      const response = await apiGet(urls.getAScanner + userID);
      setData(response?.data?.Scanned);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    onLoad();
  }, [isFocused]);

  const onRejected = async rollNo => {
    setLoading(true);
    try {
      const raw = {
        isrejected: true,
      };
      const response = await apiPut(urls.approvedReject + rollNo, raw);
      if (response?.statusCode == 200) {
        ToastMsg('Updated successfully');
        onLoad();
      } else {
        ToastMsg('Updated Failed');
      }

      console.log(JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          padding: moderateScale(10),
        }}
        ListEmptyComponent={
          <View>
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: '500',
                color: '#000',
              }}>
              {!loading && ' No Record Found'}
            </Text>
          </View>
        }
        renderItem={({item}) => {
          return item?.isrejected ? (
            <Text
              style={{
                fontSize: moderateScale(20),
                fontWeight: '500',
                color: '#000',
              }}>
              No Record Found
            </Text>
          ) : (
            <View
              style={{
                backgroundColor: '#ffffff',
                elevation: 7,
                minHeight: verticalScale(220),
                borderRadius: moderateScale(20),
                width: Dimensions.get('window').width / 2.5,
                marginBottom: verticalScale(20),
                marginHorizontal: scale(10),
              }}>
              <Pdf
                trustAllCerts={false}
                source={{uri: item?.UserPdf}}
                style={{flex: 1}}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log('ON Error' + error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  gap: scale(10),
                  padding: moderateScale(10),
                }}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    Alert.alert(
                      'Alert',
                      'Are you sure you want to approve this admit card?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => onRejected(item?._id),
                        },
                        {
                          text: 'No',
                        },
                      ],
                    );
                  }}>
                  <Icons.editIcon
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    setPdfUrl(item?.UserPdf);
                    setOpenModel(true);
                  }}>
                  <Icons.viewIcon
                    width={moderateScale(30)}
                    height={moderateScale(30)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <CustomModel
        position="center"
        visible={openModel}
        onClose={() => setOpenModel(false)}>
        <Pdf
          trustAllCerts={false}
          source={{uri: pdfUrl}}
          style={{width: '100%', height: Dimensions.get('window').height / 1.5}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log('ON Error' + error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
        />
      </CustomModel>
      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(2),
    backgroundColor: '#dbdbdc',
    borderRadius: moderateScale(10),
  },
});
export default Rejected;
