import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main_Page/Main';
import ItemPageArch from './Item_Page/ItemPageArch';
import SearchPage from './Search_Page/Component/SeachPage';
import Review from './Review_Page/Review';

const App = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Main} />
				<Route path="/search/:location" component={SearchPage} />
				<Route path="/item/:itemId" component={ItemPageArch} />
				<Route path="/review/:itemId" component={Review} />
			</div>
		</Router>
	);
};

export default App;
