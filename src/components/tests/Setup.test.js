import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from './ConfigureStore';
import Setup from '../Setup';

describe('Setup', () => {

  let mountedSetupComponent;

  beforeAll(() => {
    configure({ adapter: new Adapter() });

    const store = configureStore();
    mountedSetupComponent = shallow( <Setup store={store}/> ).dive();

    // Use debug method to print out your mounted component like this:
    // console.log(mountedSetupComponent.debug());
  });

  it('should render the game container and its children', () => {
    expect(mountedSetupComponent.find('.game-container').length).toEqual(1);
    expect(mountedSetupComponent.find('h1').text()).toEqual('JEOPARDY!');
  });

  it('should have game name undefined and filename equal to "--" when setup loads', () => {
    const setupState = mountedSetupComponent.state();

    expect(setupState.gameName).toEqual(undefined);
    expect(mountedSetupComponent.find('.file-info').text()).toEqual('Game file: --');
  });

  it('should call onLoadGame when clicking on load game button', () => {
    const loadGameSpy = jest.spyOn(mountedSetupComponent.instance(), 'onLoadGame')
      .mockImplementationOnce(() => { console.log('Were stubbin, Bob Marley'); });

    mountedSetupComponent.instance().forceUpdate();
    mountedSetupComponent.update();

    const loadGameButton = mountedSetupComponent.find('.load-game').at(0);
    loadGameButton.simulate('click');

    expect(loadGameSpy).toHaveBeenCalled();
  });

  it('should change creatingGame to true when clicking on create game button', () => {
    const setupState = mountedSetupComponent.state();
    expect(setupState.creatingGame).toEqual(false);

    const createGameButton = mountedSetupComponent.find('.create-game').at(0);
    createGameButton.simulate('click');

    const updatedSetupState = mountedSetupComponent.state();
    expect(updatedSetupState.creatingGame).toEqual(true);
  });
});