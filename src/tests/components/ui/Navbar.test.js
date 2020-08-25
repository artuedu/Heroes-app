import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { Navbar } from '../../../Components/ui/Navbar';
import React from 'react';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Arturo'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Arturo');

    });
    
    test('debe de llamar el logout y usar history', () => {
        
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout,
            payload: {}
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    });
    
});
