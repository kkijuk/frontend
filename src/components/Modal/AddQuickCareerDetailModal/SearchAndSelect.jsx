import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '@/components/shared/SearchBar';
import SvgIcon from '@/components/shared/SvgIcon';
import { getActivitySearch } from '@/api/MycareerSearch/getActivitySearch';
import { getActivitySearchForAQCModal } from '@/api/MycareerSearch/getActivitySearchForAQCModal';
import { Color } from '@/constants/color';
import { set } from 'lodash';

const SearchAndSelect = ({onChange}) => {
    const [selectedItem, setSelectedItem] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const hasFirstOpenedRef = useRef(false); // 드롭다운 첫 오픈 여부를 추적하는 ref

    const handleSelect = (item) => {
        // console.log('선택된 아이템:', item);
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

    const toggleDropdown = () => {
        // console.log('드롭다운 토글');
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        if(isDropdownOpen && !hasFirstOpenedRef.current) {
            console.log('드롭다운이 처음 열렸습니다.');
            hasFirstOpenedRef.current = true;

            (async () => {
                try {
                    const response = await getActivitySearchForAQCModal();
                    console.log('최초 활동 검색 결과:', response.data);
                    setFilteredItems(response.data.map(({title, alias, ...rest}) => ({
                        ...rest,
                        careerTitle: title,
                        careerAlias: alias,
                    })));
                } catch (error) {
                    console.error('최초 검색 중 오류 발생:', error);
                }
            })();
        }
    }, [isDropdownOpen]);

    const colorByCategory = (category) => {
        switch (category) {
            case 'CIRCLE':
                return Color.subYe;
            case 'ACTIVITY':
                return Color.subBu;
            case 'COM':
                return Color.subPu;
            case 'PROJECT':
                return '#78D333';
            case 'EMP':
                return Color.subRd;
            case 'EDU':
                return Color.subOg;
            default:
                return Color.gray02;
        }
    };

    return (
        <Container>
            <SelectedItem>
                {selectedItem?.careerTitle 
                ? (
                <Item isSearchedList={false}>
                    <SvgIcon name="career-ellipse" color={colorByCategory(selectedItem.category.categoryEnName)} size={14} />
                    {selectedItem.careerTitle}
                    <span>{selectedItem.careerAlias? `/ ${selectedItem.careerAlias}` : ''}</span>
                </Item>) 
                : '활동을 선택해주세요.'
                }
                <ToggleIcon onClick={() => toggleDropdown()} >
                    <SvgIcon 
                        name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
                        fill={Color.gray02} 
                    />
                </ToggleIcon>
            </SelectedItem>
            { isDropdownOpen && (
                <ResultDropDown>
                    <SearchBar
                        onDebounceSearch={onDebounceSearch}
                        placeholder='활동 선택'
                    />
                    <ItemList>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <Item
                                    key={index}
                                    onClick={() => {handleSelect(item); toggleDropdown();}}
                                >
                                    <SvgIcon name="career-ellipse" color={colorByCategory(item.category.categoryEnName)} size={14} />
                                    {item.careerTitle}
                                    <span>{item.careerAlias? `/ ${item.careerAlias}` : ''}</span>
                                </Item>
                            ))
                        ) : (
                            <NotFoundDiv>
                                활동을 찾을 수 없습니다.
                            </NotFoundDiv>
                        )}

                    </ItemList>
                </ResultDropDown>
            )}
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
`;

const ToggleIcon = styled.div`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
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
    height: auto;
    padding: 12px 8px;

    display: flex;
    flex-direction: row;
    gap: 8px;

    font-family: 'SemiBold';
    font-size: 12px;

    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${Color.gray06};
    }

    & > span {
        font-family: 'Regular';
    }
`;

const NotFoundDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 24px 36px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Regular';
    font-size: 14px;
    color: ${Color.gray02};
`;