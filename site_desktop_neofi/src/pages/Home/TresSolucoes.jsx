import React from 'react';
import styles from './TresSolucoes.module.css';
import { GlowCard } from '../../components/SpotlightCard/SpotlightCard'

import line_card from '../../assets/Home/NeoLine-card.png';
import boost_card from '../../assets/Home/NeoBoost-card.png';
import yield_card from '../../assets/Home/NeoYield-card.png';

// Map images to specific glow colors
const cardsData = [
    { src: boost_card, color: 'white', alt: 'NeoBoost' },
    { src: line_card, color: 'white', alt: 'NeoLine' },
    { src: yield_card, color: 'white', alt: 'NeoYield' }
];

export default function TresSolucoes() {
    return (
        <div className={styles.outerDiv}>
            <h1 className={styles.header}>
                Três soluções inovadoras<br />para você crescer
            </h1>
            
            <div className={styles.imgContainer}>
                {cardsData.map((item, index) => (
                    <GlowCard 
                        key={index} 
                        glowColor={item.color}
                        customSize={true}
                        className={styles.cardWrapper}
                    >
                        <img 
                            src={item.src} 
                            alt={item.alt}
                            // Add rounded-2xl to match the GlowCard's internal radius
                            // or use a style to inherit border-radius
                            className={`${styles.innerImage} rounded-2xl`} 
                        />
                    </GlowCard>
                ))}
            </div>
        </div>
    )
}