import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import TicketsList from './TicketsList';
import CheckTicket from './CheckTicket';
import Seatings from './Seatings';
import Settings from './Settings';
import Meetings from './Meetings';
import Coupons from './Coupons';
import SIteLogo from './SIteLogo';

const DashboardTabs = ({ setCouponUpdatePopupShow }) => {
    const tabs = [
        { key: "tickets", label: "Tickets", comp: <TicketsList /> },
        { key: "checkticket", label: "Check Tickets", comp: <CheckTicket /> },
        { key: "meetings", label: "Meetings", comp: <Meetings /> },
        { key: "seatings", label: "Seatings", comp: <Seatings /> },
        { key: "coupons", label: "Coupons", comp: <Coupons setCouponUpdatePopupShow={setCouponUpdatePopupShow} /> },
        { key: "settings", label: "Settings", comp: <Settings /> }
    ];
    
    return (
        <Tab.Container id="dashboard-tabs" className='dashboard-tabs border' defaultActiveKey="tickets">
            <div className='h-100 p-3 pb-0 d-flex flex-row overflow-hidden rounded'>
                <Nav variant="pills" className="me-3 pb-3 bg-light1 d-flex flex-column flex-shrink-0" style={{ width: '250px' }}>
                    <SIteLogo />
                    <div className="main-tabs-title-wrapper bg-white rounded mt-3">
                        {tabs.map(tab => (
                            <Nav.Item key={tab.key}>
                                <Nav.Link eventKey={tab.key}>
                                    <p className='text mb-0'>{tab.label}</p>
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </div>
                </Nav>

                <div className='tab-content bg-white rounded-top flex-grow-1 p-md-4 p-3' style={{ flex: 1 }}>
                    {tabs.map(tab => (
                        <Tab.Pane key={tab.key} eventKey={tab.key}>
                            {tab.comp}
                        </Tab.Pane>
                    ))}
                </div>
            </div>
        </Tab.Container>
    );
};

export default DashboardTabs;
