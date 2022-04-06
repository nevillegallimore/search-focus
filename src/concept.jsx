// import external dependencies
import React, { useEffect, useState } from 'react';

// import internal dependencies
import { useOptions } from './use-options';
import { useTimer } from './use-timer';

////////////////////////////////////////////////////////////////////////////////////////////////////

export const Concept = () => {
    const options = useOptions();

    const [searchInput, setSearchInput] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('');

    const inputTimer = useTimer();
    const searchTimer = useTimer();

    const isFocused = (option) => {
        return option === searchOption;
    };

    const handleKeyDown = (event) => {
        setSearchInput(event.key);
        inputTimer.trigger(() => {
            setSearchInput('');
        }, 1000);

        if (/^[a-zA-Z0-9]{1}$/.test(event.key) || event.key === ' ') {
            setSearchText(searchText + event.key);
            searchTimer.trigger(() => {
                setSearchText('');
            }, 2500);
            return;
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            searchTimer.abort();
            const index = options.findIndex((option) => {
                return option === searchOption;
            });

            if (index >= 0) {
                if (event.key === 'ArrowUp' && index >= 1) {
                    setSearchOption(options[index - 1]);
                    return;
                }

                if (event.key === 'ArrowDown' && index < options.length - 1) {
                    setSearchOption(options[index + 1]);
                    return;
                }
            }
        }
    };

    useEffect(() => {
        setSearchOption(options[0]);
    }, []);

    useEffect(() => {
        if (searchText) {
            const matches = options.filter((option) => {
                return option.toLowerCase().substring(0, searchText.length) === searchText;
            });

            if (matches.length) {
                setSearchOption(matches[0]);
            }
        }
    }, [searchText]);

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
