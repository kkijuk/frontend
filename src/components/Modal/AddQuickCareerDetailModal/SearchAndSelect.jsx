import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/shared/SearchBar';
import { getActivitySearch } from '@/api/MycareerSearch/getActivitySearch';

const SearchAndSelect = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const onDebounceSearch = async (searchValue) => {
        try {
            const response = await getActivitySearch(searchValue, 'recent');
            if (response && response.data) {
                setFilteredItems(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    return (
        <Container>
            <SelectedItem>{selectedItem}</SelectedItem>
            <SearchBar
                onDebounceSearch={onDebounceSearch}
                placeholder='활동 선택'
            />
            <ItemList>
                {filteredItems.map((item, index) => (
                    <Item
                        key={index}
                        onClick={() => handleSelect(item.careerTitle)}
                    >
                        {item.careerTitle}
                    </Item>
                ))}
            </ItemList>
        </Container>
    );
}

export default SearchAndSelect;

const Container = styled.div`
    position: relative;
    width: 100%;
`;          

const SelectedItem = styled.div`
    margin-bottom: 8px;
    padding: 8px;
    background-color: #e0f7fa;
    border-radius: 4px;
    font-weight: bold;
`;

const ItemList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
    &:active {
        background-color: #e0e0e0;
    }
`;

