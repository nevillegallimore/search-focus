// import external dependencies
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client'

// import internal dependencies
import { Concept } from './concept';

////////////////////////////////////////////////////////////////////////////////////////////////////

const Application = () => {
    const [options] = useState([
        'Abu Dhabi',
        'Amsterdam',
        'Ankara',
        'Baku',
        'Berlin',
        'Bratislava',
        'Cairo',
        'Cancun',
        'Cape City',
        'Cape Town',
        'Doha',
        'Dublin',
        'Gibraltar',
        'Hanoi',
        'Havana',
        'Jakarta',
        'Kabul',
        'Kingston',
        'Kuala Lumpur',
        'Kyiv',
    ]);
    const [searchInput, setSearchInput] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('');
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    const isFocused = (option) => {
        return !!searchOption && searchOption === option;
    };

    const handleKeyDown = (event) => {
        if (inputRef.current) {
            window.clearTimeout(inputRef.current);
        }
        setSearchInput(event.key);
        inputRef.current = setTimeout(() => {
            setSearchInput('');
        }, 1000);

        if (/^[a-zA-Z0-9]{1}$/.test(event.key) || event.key === ' ') {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            setSearchText((searchText + event.key).toLowerCase());

            timeoutRef.current = setTimeout(() => {
                setSearchText('');
            }, 2500);
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }

            const index = options.findIndex((option) => {
                return option === searchOption;
            });

            if (event.key === 'ArrowUp' && index >= 1) {
                setSearchOption(options[index - 1]);
                return;
            }

            if (event.key === 'ArrowDown' && index < options.length - 1) {
                setSearchOption(options[index + 1]);
                return;
            }
        }
    };

    useEffect(() => {
        if (!searchText) {
            return;
        }

        const filtered = options.filter((option) => {
            return option.toLowerCase().substring(0, searchText.length) === searchText;
        });

        if (!filtered.length) {
            return;
        }

        setSearchOption(filtered[0]);
    }, [searchText]);

    useEffect(() => {
        setSearchOption(options[0]);
    }, []);

    return (
        <div className="application">
            <header className="header">
                <h1 className="header-title">Search/Focus | Proof of Concept</h1>
            </header>

            <div className="container">
                <div className="column">
                    <section className="section" data-section="select">
                        <h2 className="section-title">Native Select</h2>
                        <select className="select-input">
                            {options.map((option) => (
                                <option key={option} className="select-option" value={option}>{option}</option>
                            ))}
                        </select>
                    </section>

                    <section className="section" data-section="search">
                        <h2 className="section-title">Search Text</h2>
                        <input className="search-input" type="text" onKeyDown={handleKeyDown} value={searchInput} />
                        <p className="search-text">{searchText}</p>
                    </section>
                </div>

                <div className="column">
                    <section className="section" data-section="result">
                        <h2 className="section-title">Options</h2>
                        <ul className="option-list">
                            {options.map((option) => (
                                <li key={option} className="option" data-focused={isFocused(option)}>{option}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const root = createRoot(document.getElementById('root'));
root.render(<Concept />);
