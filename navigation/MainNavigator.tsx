
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Landing,Login,SignUp,CreateProfile,CreateProfile2,CreateProfile3,CreateProfile4,ChatPop,Profile,Account, FilterPop, Matches } from '../screens'
import TabNavigator from '../screens/TabNavigator'

const MainStack = createStackNavigator()
const MainNavigator: React.FC = () => {
  const { Navigator, Screen } = MainStack

  return (
    <Navigator headerMode="none">
      <Screen name="Landing" component={Landing} />
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="CreateProfile" component={CreateProfile} />
      <Screen name="CreateProfile2" component={CreateProfile2} />
      <Screen name="CreateProfile3" component={CreateProfile3} />
      <Screen name="CreateProfile4" component={CreateProfile4} />
      <Screen name="ChatPop" component={ChatPop}/>
      <Screen name="Tabs" component={TabNavigator} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Account" component={Account} />
      <Screen name="FilterPop" component={FilterPop} />
      <Screen name="Matches" component={Matches} />
    </Navigator>
  )
}

export default MainNavigator