import React, {Component} from 'react';
import 'react-native'
import Maps from '../src/components/maps/maps/Maps'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
    let mapsData = renderer.create(<Maps />).getInstance();

    expect(mapsData._toggleModal).toEqual(true)
});
