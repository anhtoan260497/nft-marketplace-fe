import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'
import clsx from 'clsx'
import Loader from '../Loader';

Button.propTypes = {

};

function Button(props) {


    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className={clsx(styles.buttonContainer, 'mt-3')}>
            <button className={clsx(styles.mintButton)}>
                {isLoading ? <Loader /> : 'Mint'}
            </button>
        </div>
    );
}

export default Button;