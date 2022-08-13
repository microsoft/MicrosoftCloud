import React, { useEffect, useState } from 'react';
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

    const updateCheckStatus = (index: any, items: CheckboxItem[], setFunc: any) => {
        const updatedItems = items.map(item => {
            if (item.id === index) {
                item.checked = !item.checked;
            }
            return item;
        }).sort((a, b) => a.category.localeCompare(b.category));
        setFunc(updatedItems);
    };

    const filterContentItems = () => {
        // if (!searchText.length) {
        //     setItems(originalItems);
        //     return;
        // }

        // Check if searchText has a non-empty value
        let filteredItems = originalItems;
        if (searchText.length) {
            filteredItems = originalItems.filter(item => {
                return item.title.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase());
            });
        }
        if (types.filter(item => item.checked).length) {
            filteredItems = filteredItems.filter(item => {
                return types.find(type => type.checked && type.category === item.type);
            });
        }
        if (services.filter(item => item.checked).length) {
            filteredItems = filteredItems.filter(item => {
                return services.find(svc => svc.checked && item.services.includes(svc.category));
            });
        }
        if (cloudCategories.filter(item => item.checked).length) {
            filteredItems = filteredItems.filter(item => {
                return cloudCategories.find(cat => cat.checked && item.cloudCategories.includes(cat.category));
            });
        }

        setItems(filteredItems);
    }

    useEffect(() => {
        filterContentItems();
    }, [searchText, types, cloudCategories, services]);

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
                            checkHandler={() => updateCheckStatus(index, types, setTypes)}
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
                            checkHandler={() => updateCheckStatus(index, cloudCategories, setCloudCategories)}
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
                            checkHandler={() => updateCheckStatus(index, services, setServices)}
                            label={svc.category}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <div className="search-results">
                <h2>Microsoft Cloud Integration Content</h2>
                <div className="search-results-list">
                    {items && items.map((item, index) => (
                        <div className="search-result" key={index}>
                            <a href={item.url} target="_blank">
                                <div className="search-result-title">
                                    {item.type === 'Code Sample' &&
                                        <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                            <path d="M1024 25q141 0 272 36t244 104 207 160 161 207 103 245 37 272q0 165-50 318t-143 281-221 224-286 149q-3 1-9 1t-9 1q-24 0-38-14t-14-37v-140q0-69 1-141 0-51-15-103t-54-87q116-13 203-47t146-96 88-150 30-212q0-78-26-147t-79-128q11-28 16-58t5-60q0-39-8-77t-23-76q-5-2-11-2t-11 0q-32 0-67 10t-69 26-67 35-57 36q-125-35-256-35t-256 35q-25-17-57-36t-66-34-70-26-67-11h-11q-6 0-11 2-14 37-22 75t-9 78q0 30 5 60t16 58q-53 58-79 127t-26 148q0 122 29 211t88 150 146 97 203 48q-29 26-44 62t-21 75q-27 13-57 20t-60 7q-64 0-106-30t-75-82q-12-19-29-38t-37-34-43-24-48-10h-12q-8 0-15 3t-14 6-6 10q0 12 14 23t23 18l3 2q22 17 38 32t30 33 23 38 23 47q34 78 95 113t147 36q26 0 52-3t52-9v174q0 24-14 38t-39 14h-8q-5 0-9-2-157-51-286-147t-221-225-142-282-51-318q0-141 36-272t104-244 160-207 207-161T752 62t272-37z" />
                                        </svg>
                                    }
                                    {item.type === 'Video' &&
                                        <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                            <path d="M2048 576v896q0 26-10 49t-27 41-41 28-50 10q-43 0-77-26l-307-230v135q0 63-25 120t-68 99-100 68-120 26H313q-63 0-120-25t-99-68-68-100-26-120V569q0-63 25-120t68-99 100-68 120-26h910q65 0 121 25t98 68 66 100 28 120q1 11 1 22t0 23v45q0 22-1 45l307-230q34-26 77-26 27 0 50 10t41 27 27 40 10 51zm-640 0q0-39-15-74t-41-61-62-42-74-15H320q-39 0-74 15t-61 41-42 62-15 74v896q0 39 15 74t41 61 62 42 74 15h896q39 0 74-15t61-41 42-62 15-74V576zm128 608l384 288V576l-384 288v320z" />
                                        </svg>
                                    }
                                    {item.type === 'Document' &&
                                        <svg className="search-result-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                            <path d="M1792 784v1008q0 53-20 99t-55 82-81 55-100 20H512q-53 0-99-20t-82-55-55-81-20-100V256q0-53 20-99t55-82 81-55T512 0h496q51 0 98 19t83 56l528 528q36 36 55 83t20 98zm-128 0v-8q0-4-1-8h-383q-53 0-99-20t-82-55-55-81-20-100V129q-4-1-8-1t-8 0H512q-27 0-50 10t-40 27-28 41-10 50v1536q0 27 10 50t27 41 40 27 51 10h1024q27 0 50-10t40-27 28-41 10-50V784zm-90-144l-422-422v294q0 27 10 50t27 41 40 27 51 10h294z" />
                                        </svg>
                                    }
                                    {item.title}
                                </div>
                                <div className="search-result-description">{item.description}</div>
                                <div className="search-result-cloud-categories">{item.cloudCategories.join(', ')}</div>
                            </a>
                        </div>
                    ))}
                    {!items.length && <div className="search-result-title">No Content Results</div>}
                </div>
            </div>
        </div>
    );
}

export default Search;