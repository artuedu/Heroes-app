import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../Components/heroes/HeroScreen';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {
    
    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }
    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero']}>
                <HeroScreen history={history}/>
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);

    });
    
    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    });
    
    test('debe de regresar a la pantalla anterior con push', () => {
       
        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();

    });
    
    test('debe de regresar a la pantalla anterior goBack', () => {
        
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.goBack).toHaveBeenCalled();
        // expect(history.push).not.toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledTimes(0);

    });
    
    test('debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider123']}>
                <Route
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');

    });
    
});
