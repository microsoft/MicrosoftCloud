import React, { useEffect, useState } from 'react';
import { CheckboxItem, ContentItem } from '../../shared/interfaces';
import Checkbox from './Checkbox';
import SearchResult from './SearchResult';
import './Search.css';

function Search() {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [originalItems, setOriginalItems] = useState<ContentItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [cloudCategories, setCloudCategories] = useState<CheckboxItem[]>([]);
    const [types, setTypes] = useState<CheckboxItem[]>([]);
    const [services, setServices] = useState<CheckboxItem[]>([]);

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
        // eslint-disable-next-line
    }, [searchText, types, cloudCategories, services]);

    useEffect(() => {
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

        const createCategories = (items: ContentItem[]) => {
            // Get unique item.cloudCategories values
            const cloudCategories = getUniqueCategories(items, 'cloudCategories');
            setCloudCategories(cloudCategories);
    
            // Get unique item.type values
            const types = getUniqueCategories(items, 'type');
            setTypes(types);
    
            // Get unique item.services values
            const services = getUniqueCategories(items, 'services');
            setServices(services);
        }

        fetch('/MicrosoftCloud/data/items.json')
            .then(response => response.json())
            .then(data => {
                const items = data.items.sort((a: ContentItem, b: ContentItem) => a.title.localeCompare(b.title));
                setOriginalItems(items);
                createCategories(items);
                setItems(items);
            }).catch(error => {
                console.log(error);
            }
            );
    }, []);

    return (
        <div className="search-container">
            <div className="search-input-header">
                <h2>Content Filter</h2>
            </div>
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
            <div className="search-results-header">
                <h2>Content Results</h2>
            </div>
            <div className="search-results">
                <div className="search-results-list">
                    {items && items.map((item, index) => (
                        <SearchResult key={index} item={item} index={index} />
                    ))}
                    {!items.length && <div className="search-result-title">No Content Results</div>}
                </div>
            </div>
        </div>
    );
}

export default Search;