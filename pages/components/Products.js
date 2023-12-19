import React from 'react';
import styles from '../../styles/Products.module.scss'

const Products = () => {
    return (
        <div className={styles['products-container']}>
            <div className={styles['products-item-column']}>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Logos
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Digital Flyers
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Websites
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Video Editing
                    </p>
                </div>
            </div>
            <div className={styles['products-item-column']}>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Infographics
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Mobile Apps
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Signage
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Brochures
                    </p>
                </div>
            </div>
            <div className={styles['products-item-column']}>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Resumes
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Business Cards
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Banners
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Targeted Ads
                    </p>
                </div>
            </div>
            <div className={styles['products-item-column']}>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        Pitch Decks
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        SaaS
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        NFT's
                    </p>
                </div>
                <div className={styles['products-item-container']}>
                    <p className={styles['products-item-text']}>
                        and more! ✨
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Products;
