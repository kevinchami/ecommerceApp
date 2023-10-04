import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context' 
import styles from './cart.style'
import {Ionicons, SimpleLineIcons} from "@expo/vector-icons"
import { COLORS } from '../constants';
import fetchCart from '../hook/fetchCart'
import { CartTile } from '../components'


const Cart = ({navigation}) => {
  const  {data, loading, error, refetch} = fetchCart();

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
          name='chevron-back-circle'
          size={30}
          color={COLORS.primary}
          />

        </TouchableOpacity>
        <Text style={styles.titleTxt}>
          My Cart
        </Text>

      </View>

      {loading ? (<ActivityIndicator/>) 
      : (<FlatList 
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => 
          <Text>{item.cartItem.title}</Text>
      }
      />
      )}
      {console.log("Data:", data)}

    </SafeAreaView>
  )
}

export default Cart
