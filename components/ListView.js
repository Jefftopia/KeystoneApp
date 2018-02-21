import React, { PureComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

class LocationListItem extends PureComponent {

    _onPress() {
        this.props.onPressItem(this.props.id);
    }

    render() {
        return (
            <View>
                <Text style={{ color: "blue" }}>
                    test:  {this.props.name}
                </Text>
            </View>
        );
        
        // return (
        //     <TouchableOpacity onPress={this._onPress}>
        //         <View>
        //             <Text style={{ color: "blue" }}>
        //                 {this.props.name}
        //             </Text>
        //         </View>
        //     </TouchableOpacity>
        // );
    }
}


export class LocationList extends PureComponent {
    state = { selected: new Map() };

    // _keyExtractor = (item, index) => item.id;
    _keyExtractor(item, index) {
        return item.id;
    } 

    _onPressItem(id) {
        // updater functions are preferred for transactional updates
        return this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };

    // _onPressItem = (id) => {
    //     // updater functions are preferred for transactional updates
    //     this.setState((state) => {
    //         // copy the map rather than modifying state.
    //         const selected = new Map(state.selected);
    //         selected.set(id, !selected.get(id)); // toggle
    //         return { selected };
    //     });
    // };

    // _renderItem = ({ item }) => (
    //     <MyListItem
    //         id={item.id}
    //         onPressItem={this._onPressItem}
    //         selected={!!this.state.selected.get(item.id)}
    //         title={item.title}
    //     />
    // );

    _renderItem({ item }) {
        return (
            <LocationListItem
                id={item.id}
                name={item.name} />
            );
            
        // (
        // <LocationListItem
        //     id={item.id}
        //     onPressItem={this._onPressItem}
        //     selected={!!this.state.selected.get(item.id)}
        //     name={item.name} />
        // );
    }

    render() {
        return (
            <FlatList
                data={this.props.markers}
                keyExtractor={this._keyExtractor}                
                renderItem={this._renderItem}
            />
        );
    }
}
