import classNames from 'classnames/bind';

import { Link } from 'react-router-dom'
import styles from './productCard.module.scss'

const cx = classNames.bind(styles)

function ProductCard({ item }) {
    return ( 
        <Link className={cx('wrapper')} to='/product/123'>
            <img className={cx('main-img')} src={item.img} />
            <div className={cx('user')}>
                <div className={cx('avatar')}>
                    <img src={item.pp} />
                </div>
                <div className={cx('details')}>
                    <p className={cx('username')}>{item.username}</p>
                    <p className={cx('cat')}>{item.cat}</p>
                </div>
            </div>
        </Link>
     );
}

export default ProductCard;