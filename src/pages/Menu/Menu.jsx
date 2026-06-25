import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../src/assets/menu/menu-bg.jpg'
import dessertImg from '../../../src/assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../src/assets/menu/pizza-bg.jpg'
import saladImg from '../../../src/assets/menu/salad-bg.jpg'
import soupImg from '../../../src/assets/menu/soup-bg.jpg'
import MenuCategory from './MenuCategory/MenuCategory';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Menu = () => {

    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === "offered");
    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const soups = menu.filter(item => item.category === "soup");
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our menu"></Cover>
            <SectionTitle
                subHeading="Don't Miss"
                heading="today's menu"
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={desserts} img={dessertImg} title="dessert"></MenuCategory>
            <MenuCategory items={pizzas} img={pizzaImg} title="pizza"></MenuCategory>
            <MenuCategory items={salads} img={saladImg} title="salad"></MenuCategory>
            <MenuCategory items={soups} img={soupImg} title="soup"></MenuCategory>
        </div>
    );
};

export default Menu;