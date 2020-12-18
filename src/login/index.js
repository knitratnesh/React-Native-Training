// import { Component } from "react";

import React, { Component } from 'react';
import {
    View, Text, FlatList, StyleSheet,
    SectionList, Image, ScrollView, Switch, Share,
    TouchableOpacity
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
var loginInputs = {};
const dataObj = [
    { title: 'test object', key: '1', imageURL: 'https://ecomtestbucketsant.s3.ap-south-1.amazonaws.com/uploads/image-1dfe6361-3094-452a-ab47-382fc0f22587.jpg' },
    { title: 'Text 2', key: '2', imageURL: 'https://ecomtestbucketsant.s3.ap-south-1.amazonaws.com/uploads/image-1dfe6361-3094-452a-ab47-382fc0f22587.jpg' },
    { title: 'Text 3', key: '3', imageURL: 'https://ecomtestbucketsant.s3.ap-south-1.amazonaws.com/uploads/image-1dfe6361-3094-452a-ab47-382fc0f22587.jpg' },
];

const sections = [
    {
        key: 0,
        title: 'Basic Components',
        data: [
            { id: 0, text: 'test text' },
            { id: 1, text: 'Text' },
            { id: 2, text: 'Image' },
        ]
    },
    {
        key: 1,
        title: 'List Components',
        data: [
            { id: 3, text: 'ScrollView' },
            { id: 4, text: 'ListView' },
        ]
    }
]

const extractKey = ({ key }) => key
export default class Login extends Component {
    constructor() {
        super();

        //First it will be called
    }

    componentDidMount() {
        console.log(" componentDidMount called");
    }
    state = {
        isEnabled: false,
    }
    renderSectionListItem(item) {
        return (
            <Text style={styles.row}>
                {item.item.text}
            </Text>
        )
    }

    renderSectionHeader(section) {
        return (
            <Text style={styles.header}>
                {section.title}
            </Text>
        )
    }


    renderShareButton() {
        Share.share({
            message: 'this is share message'
        }).then(
            console.log('share successful')
        );
    }
    renderClickButton() {
        // loginInputs.userName ={this.state.userName}
        return (
            <TouchableOpacity onPress={() => {
                Actions.homescreen({ comingFrom: 'login', anotherProp: "xyz" })
            }} style={{ margin: 15, borderWidth: 1, flex: 1, borderColor: 'blue', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{'Go To Home'}</Text>
            </TouchableOpacity>
        )
    }
    renderSectionList() {
        return (
            <SectionList
                style={styles.container}
                sections={sections}
                renderItem={(item) => this.renderSectionListItem(item)}
                renderSectionHeader={(section) => this.renderSectionHeader(section.section)}
                keyExtractor={extractKey}
                onEndReachedThreshold={0.5}
            />
        );
    }

    renderFlatList() {
        return (
            <FlatList
                extraData={this.state}
                data={dataObj}
                // onEndReached={this.endReached}
                // onEndReachedThreshold={.7}
                ListHeaderComponent={() => this.renderItemSeparator()}
                ListFooterComponent={() => this.renderItemSeparator()}
                ItemSeparatorComponent={() => this.renderItemSeparator()}
                renderItem={({ item }) => this.renderFlatListItem(item)}
            />
        )
    }

    endReached() {
        console.log('.....End Reached');
    }

    renderItemSeparator() {
        return (
            <View style={{ height: 2, backgroundColor: '#000', flex: 1 }} />
        )
    }
    renderFlatListItem(item) {
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Text>{item.title}</Text>
                <Image style={{ height: 50, width: 50 }} source={{ uri: item.imageURL }} />
            </View>

        )
    }
    static getDerivedStateFromProps(props, state) {
        // if (props.selected !== state.selected) {
        //     return {
        //         selected: props.selected,
        //     };
        // }

        // Return null if the state hasn't changed
        return null;
    }
    componentDidUpdate() {
        console.log("componentDidUpdate called")
    }

    componentWillUnmount() {
        console.log("componentWillUnmount called")
    }
    componentDidCatch() {
        console.log("componentDidCatch called")
    }


    renderSwitch() {
        return (
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={(value) => { console.log("value from switch : =>" + value); this.setState({ isEnabled: value }) }}
                value={this.state.isEnabled}
            />
        )
    }

    renderShare() {
        return (
            <TouchableOpacity onPress={() => this.renderShareButton()} style={{ flex: 1, borderWidth: 1, borderColor: '#000' }}>
                <Text>{'Share Button'}</Text>
            </TouchableOpacity>
        )
    }

    renderAsyncStorageForm() {
        return (
            <TouchableOpacity onPress={() => Actions.asyncstoragedemo()} style={{ flex: 1, borderWidth: 1, borderColor: '#000' }}>
                <Text>{'Show Form'}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <ScrollView>
                <Text>{'First Page'}</Text>
                {this.renderClickButton()}
                {this.renderSectionList()}
                {this.renderShare()}
                {this.renderAsyncStorageForm()}
                {/* {this.renderFlatList()} */}
                {/* {this.renderClickButton()}
                // {this.renderFlatList()}
                {this.renderSectionList()} */}
                {/* {this.renderSwitch()} */}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
    header: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'steelblue',
        color: '#000',
        fontWeight: 'bold',
    },
})
