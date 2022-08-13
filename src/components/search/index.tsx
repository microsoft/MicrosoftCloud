import React, { KeyboardEvent, useEffect, useState } from 'react';
import { CheckboxItem, ContentItem } from '../../shared/interfaces';
import Checkbox from './checkbox';
import './index.css';

function Search() {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [originalItems, setOriginalItems] = useState<ContentItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [cloudCategories, setCloudCategories] = useState<CheckboxItem[]>([]);
    const [types, setTypes] = useState<CheckboxItem[]>([]);
    const [services, setServices] = useState<CheckboxItem[]>([]);

    const getCategories = (items: ContentItem[]) => {
        // Get unique item.cloudCategories values
        const cloudCategories = getUniqueCategories(items, 'cloudCategories');
        setCloudCategories(cloudCategories);

        // Get unique item.type values
        const types = getUniqueCategories(items, 'type')
        setTypes(types);

        // Get unique item.services values
        const services = getUniqueCategories(items, 'services');
        setServices(services);
    }

    const getUniqueCategories = (items: ContentItem[], property: string) => {
        return items.map(item => {
            // Object key will contain a union of all property names for `item`
            type ObjectKey = keyof typeof item;
            return item[property as ObjectKey];
        })
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index).sort()
            .map((category, index) => addCheckedProperty(category, index))
            .sort((a, b) => a.category.localeCompare(b.category));
    }

    const addCheckedProperty = (category: string, index: number) => {
        return {
            id: index,
            category,
            checked: false
        };
    };

    const updateCheckStatus = (items: CheckboxItem[], index: any, setFunc: any) => {
        const updatedItems = items.map(item => {
            if (item.id === index) {
                item.checked = !item.checked;
            }
            return item;
        }).sort((a, b) => a.category.localeCompare(b.category));
        setFunc(updatedItems);
    };

    const filterContentItems = () => {
        if (searchText.length === 0) {
            setItems(originalItems);
            return;
        }
        // Get all items that match the search text
        const filteredItems = originalItems.filter(item => {
            return item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.description.toLowerCase().includes(searchText.toLowerCase());
        }).sort((a, b) => a.title.localeCompare(b.title));
        setItems(filteredItems);
    }

    useEffect(() => {
        filterContentItems();
    }, [searchText]);

    useEffect(() => {
        fetch('/data/items.json')
            .then(response => response.json())
            .then(data => {
                const items = data.items.sort((a: ContentItem, b: ContentItem) => a.title.localeCompare(b.title));
                setOriginalItems(items);
                getCategories(items);
                setItems(items);
            }).catch(error => {
                console.log(error);
            }
            );
    }, []);

    return (
        <div className="search-container">
            <div className="search-input">
                <input type="text" title="Search" placeholder="Filter Results"
                    onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="search-filter">
                <div className="checkbox-group">
                    <h4>Content Type</h4>
                    {types && types.map((type, index) => (
                        <Checkbox
                            key={type.id}
                            isChecked={type.checked}
                            checkHandler={() => updateCheckStatus(types, index, setTypes)}
                            label={type.category}
                            index={index}
                        />
                    ))}
                </div>
                <div className="checkbox-group">
                    <h4>Cloud</h4>
                    {cloudCategories && cloudCategories.map((cloudCat, index) => (
                        <Checkbox
                            key={cloudCat.id}
                            isChecked={cloudCat.checked}
                            checkHandler={() => updateCheckStatus(cloudCategories, index, setCloudCategories)}
                            label={cloudCat.category}
                            index={index}
                        />
                    ))}
                </div>
                <div className="checkbox-group">
                    <h4>Cloud Services</h4>
                    {services && services.map((svc, index) => (
                        <Checkbox
                            key={svc.id}
                            isChecked={svc.checked}
                            checkHandler={() => updateCheckStatus(services, index, setServices)}
                            label={svc.category}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <div className="search-results">
                <h2>Microsoft Cloud Integration Content</h2>
                <div className="search-results-list">
                    {items && items.map(item => (
                        <div className="search-result" key={item.id}>
                            <div className="search-result-title">
                                {item.type === 'Code Sample' &&
                                    <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                        <path d="M1024 25q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 165-50 318t-143 281-221 224-286 149q-3 1-9 1t-9 1q-24 0-38-14t-14-37v-140q0-69 1-141 0-51-15-103t-54-87q116-13 203-47t146-96 88-150 30-212q0-78-26-147t-79-128q11-28 16-58t5-60q0-39-8-77t-23-76q-5-2-11-2t-11 0q-32 0-67 10t-69 26-67 35-57 36q-125-35-256-35t-256 35q-25-17-57-36t-66-34-70-26-67-11h-11q-6 0-11 2-14 37-22 75t-9 78q0 30 5 60t16 58q-53 58-79 127t-26 148q0 122 29 211t88 150 146 97 203 48q-29 26-44 62t-21 75q-27 13-57 20t-60 7q-64 0-106-30t-75-82q-12-19-29-38t-37-34-43-24-48-10h-12q-8 0-15 3t-14 6-6 10q0 12 14 23t23 18l3 2q22 17 38 32t30 33 23 38 23 47q34 78 95 113t147 36q26 0 52-3t52-9v174q0 24-14 38t-39 14h-8q-5 0-9-2-157-51-286-147t-221-225-142-282-51-318q0-141 36-272t104-244 160-207 207-161T752 62t272-37z" />
                                    </svg>
                                }
                                {item.type === 'Video' &&
                                    <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                        <path d="M1024 0q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 141-36 272t-104 244-160 207-207 161-245 103-272 37q-141 0-272-36t-244-104-207-160-161-207-103-245-37-272q0-141 36-272t104-244 160-207 207-161T752 37t272-37zm512 1021L768 512v1024l768-515z" />
                                    </svg>
                                }
                                {item.type === 'Document' &&
                                    <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                        <path d="M1755 512h-475V37l475 475zm37 128v1408H128V0h1024v640h640z" />
                                    </svg>
                                }
                                <a href={item.url} target="_blank">{item.title}</a>
                            </div>
                            <div className="search-result-description">{item.description}</div>
                        </div>
                    ))}
                    {!items.length && <div className="search-result-title">No Content Results</div>}
                </div>
            </div>
        </div>
    );
}

export default Search;