
import React, { Component } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-community/asyncstorage';
import KeyChain from 'react-native-keychain';
import AsyncStorage from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'training.db' });

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            page: 1,
            loading: false,
            maxrecords: 20
        }
    }
    componentDidMount() {
        this.fetchWebAPI()
    }

    executeSLiteQuery() {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
    }
    handleRefreshPage = () => {
        this.setState({
            page: 1,
        }, () => this.fetchWebAPI())
    }
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => { this.fetchWebAPI() })
    }
    render() {
        return (
            <View>
                <Text>{'Second Page'}</Text>
                {this.renderFlatList()}
                {this.renderActivityIndicator()}
            </View>
        )
    }

    renderItemSeparator() {
        // AsyncStorage.setItem("key", JSON.stringify())
        return (
            <View>
                <View style={{ height: 2, backgroundColor: '#000', flex: 1 }} />
            </View>
        )
    }

    renderFlatListItem(item) {
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Image style={{ height: 50, width: 50 }} source={{ uri: item.urlToImage }} />
                <Text>{item.title}</Text>
            </View>
        )
    }
    renderFlatList() {
        return (
            <FlatList
                extraData={this.state}
                data={this.state.data}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={.7}
                ListHeaderComponent={() => this.renderItemSeparator()}
                ListFooterComponent={() => this.renderItemSeparator()}
                ItemSeparatorComponent={() => this.renderItemSeparator()}
                renderItem={({ item }) => this.renderFlatListItem(item)}
                refreshing={this.handleRefreshPage}
            />
        )
    }



    renderActivityIndicator() {
        return (
            <ActivityIndicator size="large" color="blue" hidesWhenStopped={false} animating={this.state.loading} style={{ justifyContent:'center', flex: 1, width: 50, height: 50 }} />
        )
    }

    fetchWebAPI() {
        const { page, maxrecords } = this.state;
        this.setState({loading:true})
        fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-12-18&sortBy=publishedAt&apiKey=6ade361c08fe4d2ab661733c978250e9&page={' + page + '}' + '&results={' + maxrecords + '}', {
            //inpurs if any
            method: 'GET'
        }).then((res) => res.json())
            .then((response) => {
                var responseData = response;
                if (responseData.status === "ok" && responseData.totalResults > 0) {
                    console.log("@@@@@@@@@@@@ response from web API :" + JSON.stringify(response));
                    this.setState({
                        data: [...this.state.data, ...responseData.articles],
                        error: null,
                    })
                }
            });
    }
}