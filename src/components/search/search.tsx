import React, { useEffect, useState } from 'react';
import { CheckboxItem, ContentItem } from '../../shared/interfaces';
import Checkbox from './Checkbox';
import SearchResult from './SearchResult';
import './Search.scss';

function Search({ data }: { data: ContentItem[] }) {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [originalItems, setOriginalItems] = useState<ContentItem[]>([]);
    const [relatedContent, setRelatedContent] = useState<ContentItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>();
    const [searchText, setSearchText] = useState('');
    const [cloudCategories, setCloudCategories] = useState<CheckboxItem[]>([]);
    const [types, setTypes] = useState<CheckboxItem[]>([]);
    const [services, setServices] = useState<CheckboxItem[]>([]);

    const updateCheckStatus = (index: any, items: CheckboxItem[], setFunc: any) => {
        const updatedItems = items.map(item => {
            if (item.id === index) {
                item.checked = !item.checked;
            }
            return item;
        }).sort((a, b) => a.category.localeCompare(b.category));
        setSelectedItem(null);
        setFunc(updatedItems);
    };

    const filterContentItems = () => {
        let filteredItems = originalItems;
        if (searchText.length) {
            filteredItems = originalItems.filter(item => {
                return item.title.toLowerCase()
                    .includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase());
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
    };

    const getRelatedItems = (item: ContentItem) => {
        // Get item.relatedContentItems and find matches in originalItems
        if (item.relatedContentItems) {
            const relatedContentItems = item.relatedContentItems.map(relatedItem => {
                return originalItems.find(originalItem => originalItem.id === relatedItem);
            })
                .filter(relatedItem => relatedItem !== undefined)
                .sort((a, b) => a!.title.localeCompare(b!.title)) as ContentItem[];
            setRelatedContent(relatedContentItems);
        }
        else {
            setRelatedContent([]);
        }
    };

    const searchResultClick = (item: ContentItem) => {
        setSelectedItem(item);
        getRelatedItems(item);
    }

    useEffect(() => {
        filterContentItems();
        // eslint-disable-next-line
    }, [searchText, types, cloudCategories, services]);

    useEffect(() => {
        const getUniqueValues = (items: ContentItem[], property: string) => {
            return items.map(item => {
                // Object key will contain a union of all property names for `item`
                type ObjectKey = keyof typeof item;
                return item[property as ObjectKey] ?? [];
            })
                .flat()
                .filter((value, index, self) => self.indexOf(value) === index).sort()
                .map((value, index) => {
                    return {
                        id: index,
                        category: value as string,
                        checked: false
                    };
                })
                .sort((a, b) => a.category.localeCompare(b.category));
        }

        const createCategories = (items: ContentItem[]) => {
            // Get unique item.cloudCategories values
            const cloudCategories = getUniqueValues(items, 'cloudCategories');
            setCloudCategories(cloudCategories);

            // Get unique item.type values
            const types = getUniqueValues(items, 'type');
            setTypes(types);

            // Get unique item.services values
            const services = getUniqueValues(items, 'services');
            setServices(services);
        }

        const items = data.sort((a: ContentItem, b: ContentItem) => a.title.localeCompare(b.title));
        setOriginalItems(items);
        createCategories(items);
        setItems(items);

    }, [data]);

    return (
        <section className="content">
            <div className="search-container">
                <div className="search-input-header">
                    <h2>Filter</h2>
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
                            <SearchResult
                                key={index}
                                item={item}
                                index={index}
                                isSelected={item.id === selectedItem?.id}
                                onClick={() => searchResultClick(item)} />
                        ))}
                        {!items.length && <div className="search-result-title">No Content Results</div>}
                    </div>
                </div>
                {selectedItem &&
                    <>
                        <div className="related-content-header">
                            <h2>&nbsp;</h2>
                        </div>
                        <div className="related-content">
                            <SearchResult
                                key={selectedItem?.id}
                                item={selectedItem!}
                                index={0}
                                showButton={true} />

                            <div className="search-results-list">
                                {relatedContent && relatedContent.length > 0 &&
                                    <div>
                                        <h3>Related Content</h3>
                                        {relatedContent.map((item, index) => (
                                            <SearchResult
                                                key={index}
                                                item={item}
                                                index={index}
                                                showButton={true} />
                                        ))}
                                    </div>
                                }

                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

export default Search;