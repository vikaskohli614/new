import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopBar from '../component/TopBar';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ToastMsg, showError, width } from '../utils/helperFunction';
import colors from '../styles/colors';
import Icons from '../assets/icons';
import CustomModel from '../component/CustomModel';
import { apiGet, apiPut, getItem } from '../utils/utils';
import urls from '../config/urls';
import Loader from '../component/Loader';
import Pdf from 'react-native-pdf';

const Home = ({ route, navigation }) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rollNo, setRollNo] = useState('');

  const [userResponse, setuserResponse] = useState({});

  const fetchAdmitCard = async () => {
    try {
      if (route?.params) {
        // console.log(route?.params)
        setLoading(true);
        const userID = await getItem('userId');
        const response = await apiGet(
          // urls.getAdmitCard + route?.params?.rollNo + '/' + userID,
          // urls.getuserAdmitcard + route?.params?.rollNo,
          urls.getAdmitcard + route?.params?.rollNo,
        );
        setLoading(false);
        // console.log(response);
        if (response?.statusCode == 200) {
          setUserData(response?.data);
          setuserResponse(response?.data)
        } else {
          showError('Invalid Roll Number');
        }
      }
    } catch (error) {
      console.log(error);
      showError('Network Error');
    }
  };
  useEffect(() => {
    fetchAdmitCard();
    if (route?.params) {
      setRollNo(route?.params?.rollNo);
    }
  }, []);

  const onApproved = async () => {
    setLoading(true);
    try {
      const raw = {
        isrejected: false,
      };
      const response = await apiPut(urls.approvedReject + rollNo, raw);
      setLoading(false);
      console.log(JSON.stringify(response));
      if (response?.statusCode == 200) {
        ToastMsg('Approved successfully');
        navigation.goBack();
      } else {
        ToastMsg('Approved Failed');
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onRejected = async () => {
    setLoading(true);
    try {
      const raw = {
        isrejected: true,
      };
      const response = await apiPut(urls.approvedReject + rollNo, raw);
      if (response?.statusCode == 200) {
        ToastMsg('Rejected successfully');
      } else {
        ToastMsg('Rejected Failed');
      }

      console.log(JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={'Home'} />
      <View
        style={{
          alignItems: 'center',
          gap: verticalScale(20),
          justifyContent: 'center',
          flex: 1,
          paddingVertical: verticalScale(20),
        }}>
        {/* <Pdf
          trustAllCerts={false}
          source={{uri: userData?.UserPdf}}
          style={styles.image}
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
        /> */}
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                {/* <Image source={require('./mp.png')} style={styles.logo} /> */}
                <Text style={styles.headerText}>{userResponse?.DesiredTest}</Text>
              </View>
              <Text style={styles.examCenter}>Exam Centre - {userResponse?.ExamCenter}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsColumn}>
                <Text style={styles.detailLabel}>Roll No. -</Text>
                <Text style={styles.detailLabel}>Name -</Text>
                <Text style={styles.detailLabel}>Father's Name -</Text>
                <Text style={styles.detailLabel}>DOB -</Text>
                <Text style={styles.detailLabel}>Registration No. -</Text>
              </View>
              <View style={styles.detailsColumn}>
                <Text style={styles.detailText}>{userResponse?.RollNumber}</Text>
                <Text style={styles.detailText}>{userResponse?.Name}</Text>
                <Text style={styles.detailText}>{userResponse?.FathersName}</Text>
                <Text style={styles.detailText}>{userResponse?.DateOfBirth}</Text>
                <Text style={styles.detailText}>{userResponse?.RollNumber}</Text>
              </View>
              <View style={styles.qrContainer}>
                {/* <QRCode value={userResponse?._id} size={100} /> */}
              </View>
            </View>
          </View>
          <View style={styles.sidePanel}>
            <View style={styles.sidePanelItem}>
              <Image source={require('../assets/images/date.png')} style={styles.icon} />
              <Text style={styles.sidePanelText}>Exam Date - 19 May 2024</Text>
            </View>
            <View style={styles.sidePanelItem}>
              <Image source={require('../assets/images/time.png')} style={styles.icon} />
              <Text style={styles.sidePanelText}>Reporting Time - 9am</Text>
            </View>
            <View style={styles.sidePanelItem}>
              <Image source={require('../assets/images/location.png')} style={styles.icon} />
              <Text style={styles.sidePanelText}>Address Harda Degree College, Indore Road, Harda</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', gap: scale(22) }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => onApproved()}>
            <Icons.correct />
            <Text style={styles.buttonText}>Approved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModelVisible(true)}
            style={[styles.button, { backgroundColor: colors.red }]}
            activeOpacity={0.8}>
            <Icons.incorrect />
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* <CustomModel
        visible={modelVisible}
        position="center"
        onClose={() => setModelVisible(false)}>
        <View style={styles.modelContainer}>
          <Icons.crossBig />
          <Text style={styles.modelTextTitle}>
            Are you Sure Reject Admit card
          </Text>
          <View style={{ flexDirection: 'row', gap: scale(20) }}>
            <TouchableOpacity
              style={styles.modelButton}
              activeOpacity={0.8}
              onPress={() => {
                onRejected();
                setModelVisible(false);
              }}>
              <Text style={styles.modelButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModelVisible(false)}
              style={[
                styles.modelButton,
                {
                  borderWidth: 2,
                  backgroundColor: colors.white,
                  borderColor: '#005575',
                },
              ]}>
              <Text style={[styles.modelButtonText, { color: '#005575' }]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModel> */}
      <Loader visible={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#47DD00',
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(7),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  image: {
    width: width * 0.88,
    height: verticalScale(414),
    borderRadius: moderateScale(20),
    backgroundColor: 'white',
    elevation: 7,
  },
  modelTextTitle: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
  },
  modelButton: {
    backgroundColor: '#005575',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(12),
  },
  modelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.white,
  },
  modelContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
    gap: verticalScale(10),
    paddingVertical: verticalScale(20),
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDE68A',
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  examCenter: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  detailsColumn: {
    flex: 1,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    color: colors.black,
  },
  detailText: {
    fontSize: 12,
    marginBottom: 5,
    color: colors.black,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidePanel: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  sidePanelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  sidePanelText: {
    fontSize: 12,
    color: colors.black,
  },
});
export default Home;
