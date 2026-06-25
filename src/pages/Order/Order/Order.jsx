import { useState } from "react";
import Cover from "../../../Shared/Cover/Cover";
import orderCoverImg from "../../../assets/shop/order.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";

const Order = () => {

    const [tabIndex, setTabIndex] = useState(0)

    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === "offered");
    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const soups = menu.filter(item => item.category === "soup");

    return (
        <div>
            <Cover img={orderCoverImg} title="order food"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Dessert</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    {/* {
                        desserts.map(dessert => <FoodCard key={dessert._id} item={dessert}></FoodCard>)
                    } */}
                </TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;