import React from 'react';
import styles from './SpellingText.module.css';

// Component to render the text with a letter-by-letter animation
export default function SpellingText({ name }) {
    // 1. Split the name into an array of characters
    const letters = name.split('');
    const baseDelay = 0.1; // Delay (in seconds) between each letter

    return (
        <div className={styles.textWrapper}>
            {letters.map((char, index) => (
                <span 
                    key={index}
                    className={styles.letter}
                    style={{
                        // 2. Calculate the unique animation delay for each letter
                        animationDelay: `${index * baseDelay}s`,
                        
                        // Handle spaces by ensuring they take up space but are invisible
                        display: char === ' ' ? 'inline-block' : 'inline',
                        minWidth: char === ' ' ? '0.5em' : 'auto', 
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}