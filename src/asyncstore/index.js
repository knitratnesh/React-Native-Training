import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, NativeModules } from 'react-native';
import ImagePicker from 'react-native-image-picker';


var userDetails = {};
var showToast = NativeModules.TrainingModule;
export default class AsyncStoreDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            storedUserName: '',
            storedPassword: '',
            selectedImageURL: ''
        }

    }

    async saveToAsyncStore() {
        if(showToast!==null){
           await showToast.show();
        }
        else{
            console.log("@@@@@@@@@@@@@@@ native module is null")
        }
        // userDetails.userName = this.state.userName;
        // userDetails.password = this.state.password;
        // await AsyncStorage.setItem('userdetails', JSON.stringify(userDetails));
        // console.log('record saved');
    }



    async getValueFromAsyncStore() {
        var savedUserDetails = await AsyncStorage.getItem('userdetails');
        var user = {};
        if (savedUserDetails !== null && savedUserDetails !== undefined) {
            user = JSON.parse(savedUserDetails);
            console.log("user name :" + user.userName);
            console.log("user name :" + user.password);
        }
        else {
            console.log("No stored records");
        }

    }

    showSavedUser() {
        return (
            <View>
                <Text>{}</Text>
            </View>
        )
    }

    showPickerImage() {
        return (
            <TouchableOpacity onPress={() => this.pickImageHandler()} style={{ alignItems: 'center', borderWidth: 1, borderColor: 'red', justifyContent: 'center' }}>
                <Image source={this.state.selectedImageURL} style={{ height: 60, width: 60, marginTop: 20 }} />
                <Text>{'Upload Image'}</Text>
            </TouchableOpacity>
        )

    }


    pickImageHandler() {
        ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 }, result => {
            if (result.didCancel) {
                console.log('User Cancelled Picker')
            }
            else if (result.error) {
                console.log("Error", result.error)
            }
            else {
                this.setState({ selectedImageURL: { uri: result.uri } })
            }
        });
    }
    render() {
        return (
            <View>

                <View style={{ backgroundColor: 'grey' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 15 }}>
                        <View style={{ flex: 0.3 }}>
                            <Text>{'User Name :'}</Text>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <TextInput ref={'username'} returnKeyType="next" onSubmitEditing={() => this.refs.password.focus()} value={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} style={{ height: 50 }} />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 15 }}>
                        <View style={{ flex: 0.3 }}>
                            <Text>{'Password :'}</Text>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <TextInput ref={'password'} returnKeyType="done" value={this.state.password} onChangeText={(text) => this.setState({ password: text })} style={{ height: 50 }} />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.saveToAsyncStore()} style={{ alignItems: 'center', justifyContent: 'center', margin: 15, borderColor: '#FFF', borderWidth: 1, height: 50 }}>
                            <Text>{'click to save'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.getValueFromAsyncStore()} style={{ alignItems: 'center', justifyContent: 'center', margin: 15, borderColor: '#FFF', borderWidth: 1, height: 50 }}>
                            <Text>{'click to see record'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {this.showPickerImage()}
                </View>
            </View>
        )
    }
}