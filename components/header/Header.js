import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import theme, { flexCenter } from '../../global/theme';
import SearchInput from './SearchInput';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import MyMenu from '../dropDown/MyMenu';
import DotMenu from '../dropDown/DotMenu';
import Notifications from '../dropDown/Notifications';
import Messages from '../dropDown/Messages';
import SearchDropdown from "../dropDown/SearchDropdown";
import { CHANGE_NAV } from '../../redux/header/headerTypes';
import { changeNav } from '../../redux/header/headerActions';


const Header = (props) => {
  // state
  const [myMenuData, setMyMenuData] = useState([]);
  const [dotMenuData, setDotMenuData] = useState([]);
  const [NotiData, setNotiData] = useState([]);
  const [msgData, setMsgData] = useState([]);

  const fetchMyMenu = async () => {
    const response = await fetch('http://localhost:3000/data/myMenu.json');
    const result = await response.json();
    return setMyMenuData(result.data);
  };

  const fetchDotMenu = async () => {
    const response = await fetch('http://localhost:3000/data/dotMenu.json');
    const result = await response.json();
    return setDotMenuData(result.data);
  };
  const fetchMessages = async () => {
    const response = await fetch('http://localhost:3000/data/Notice.json');
    const result = await response.json();
    return setMsgData(result.data);
  };
  const fetchNotifications = async () => {
    const response = await fetch('http://localhost:3000/data/Notice.json');
    const result = await response.json();
    return setNotiData(result.data);
  };

  useEffect(() => {
    fetchDotMenu();
    fetchMyMenu();
    fetchNotifications();
    fetchMessages();
  }, []);
  const { selectNav, inputVal } = props;
  return (
    <HeaderContainer>
      <HeaderBlackBar>
        <CenterContainer>
          <LeftBox />
          <SearchInput />
          <RightBox />
        </CenterContainer>
      </HeaderBlackBar>
      <DropdownContainer>
        {selectNav === 5 && (
          <MyMenuWrap>
            <MyMenu data={myMenuData} />
          </MyMenuWrap>
        )}
        {selectNav === 6 && (
          <WideWrap>
            <Notifications data={NotiData} />
          </WideWrap>
        )}
        {selectNav === 7 && (
          <WideWrap>
            <Messages data={msgData} />
          </WideWrap>
        )}
        {selectNav === 8 && (
          <DotMenuWrap>
            <DotMenu data={dotMenuData} />
          </DotMenuWrap>
        )}
        {selectNav === 9 && (
          <SearchDropdownWrap>
            <SearchDropdown />
          </SearchDropdownWrap>
        )}
      </DropdownContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
width:100%;
${flexCenter};
flex-direction:column;
`;
const HeaderBlackBar = styled.div`
${flexCenter};
flex-wrap:nowrap;
flex-direction:column;
background-color: ${theme.chacoal};
width:100%;
`;

const CenterContainer = styled.div`
display:flex;
width:1240px;
`;
const DropdownContainer = styled.div`
display:flex;
justify-content:flex-end;
width:1240px;
`;


const MyMenuWrap = styled.div`
position: relative;
right: 148px;

`;
const DotMenuWrap = styled.div`
max-width:200px;
width:170px;
position:relative;
`;

const SearchDropdownWrap = styled.div`
  position: relative;
  padding-right: 50%;
  left:278px;
`;

const WideWrap = styled.div`
width:360px;
position:absolute;
`;


const mapStateToProps = (state) => ({
  selectNav: state.selectNav,
  inputVal: state.inputVal,
});

const mapDispatchToProps = (dispatch) => ({
  changeNav: () => dispatch(changeNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);