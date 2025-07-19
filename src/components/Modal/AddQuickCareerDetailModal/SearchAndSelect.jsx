import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/shared/SearchBar';
import { getActivitySearch } from '@/api/MycareerSearch/getActivitySearch';
import { Color } from '@/constants/color';

const SearchAndSelect = ({onChange}) => {
    const [selectedItem, setSelectedItem] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSelect = (item) => {
        console.log('선택된 아이템:', item);
        setSelectedItem(item);
        onChange(item); // 선택된 아이템을 부모 컴포넌트로 전달
        setFilteredItems([]); // 선택 후 검색 결과 초기화
    };

    const onDebounceSearch = async (searchValue) => {
        try {
            const response = await getActivitySearch(searchValue, 'recent');
            if (response && response.data) {
                setFilteredItems(response.data.data);
                console.log('활동 검색 결과:',response.data.data);
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    return (
        <Container>
            <SelectedItem>
                {selectedItem?.careerTitle ?? '활동을 선택해주세요.'}
            </SelectedItem>
            <ResultDropDown>
                <SearchBar
                    onDebounceSearch={onDebounceSearch}
                    placeholder='활동 선택'
                />
                <ItemList>
                    {filteredItems.map((item, index) => (
                        <Item
                            key={index}
                            onClick={() => handleSelect(item)}
                        >
                            {item.category.categoryEnName}
                            {item.careerTitle}
                            <span>{item.careerAlias? `(${item.careerAlias})` : ''}</span>
                        </Item>
                    ))}
                </ItemList>
            </ResultDropDown>
        </Container>
    );
}

export default SearchAndSelect;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    position: relative;
`;      

const ResultDropDown = styled.div`
    box-sizing: border-box;
    height: auto;
    width: 100%;
    padding: 12px 16px;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SelectedItem = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 15px 20px;
    position: relative;
    background-color: ${Color.gray06};
    border-radius: 10px;
    font-family: 'Regular';
    font-size: 14px;
    font-weight: 400;
    color: ${Color.gray02};

    & svg {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const ItemList = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    padding: 0px;

    display: flex;
    flex-direction: column;
    gap: 0px;

    background-color: white;
    border: none;
`;

const Item = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px;

    display: flex;
    flex-direction: row;
    gap: 8px;

    background-color: ${Color.white};
    font-family: 'SemiBold';
    font-size: 12px;

    cursor: pointer;

    &:hover {
        background-color: ${Color.gray06};
    }

    & > span {
        font-family: 'Regular';
    }
`;