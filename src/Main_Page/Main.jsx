import React, { Component } from 'react';
import LocationRecommendation from './LocationRecommendation';
import TodayReview from './TodayReview';
import RecentActivity from './RecentActivity';
import Search from './Search';
import config from '../config/config.json';

let GOOGLEMAPAPIKEY = config.GOOGLEMAPAPIKEY;

class Main extends Component {
	constructor() {
		super();

		this.state = {
			reviewOfTheDay: null,
			recentActivityList: null,
			searchInput: null,
			searchResult: null,
			error: null,
			currentLoc: null,
			generateData: false
		};
		this._fetchMatchingDataToSearchInput = this._fetchMatchingDataToSearchInput.bind(this);
		this._triggerFetchWithClick = this._triggerFetchWithClick.bind(this);
	}

	componentDidMount() {
		console.log('generateData:::: ', this.state.generateData);
		if (!this.state.generateData) {
			console.log('generateData::: ', 'executeddd!!!!!');
			fetch('http://localhost:3002/generateData');
			this.setState({
				generateData: true
			});
		}
		this._getTodayReview();
		this._getTop9RecentActivities();
		this._triggerFetchRestaurantsNearby();
	}

	_getTop9RecentActivities() {
		fetch('http://localhost:3002/api/activities/recentlyCreated').then((res) => res.json()).then((json) => {
			this.setState({
				recentActivityList: json
			});
		});
	}

	_getTodayReview() {
		fetch(`http://localhost:3002/api/reviews/reviewoftheday`).then((res) => res.json()).then((json) => {
			this.setState({
				reviewOfTheDay: [ json ]
			});
		});
	}

	_updateSearchInput(e) {
		this.setState({
			searchInput: e.target.value
		});
	}

	_fetchMatchingDataToSearchInput() {
		let location = this.state.searchInput;
		fetch(`http://localhost:3002/api/restaurants?district=${location}`).then((res) => res.json()).then((json) => {
			this.setState({
				searchResult: json
			});
		});
	}
	_triggerFetchWithClick() {
		this._fetchMatchingDataToSearchInput();
	}
	_triggerFetchWithEnter(e) {
		console.log(e.key);
		const { history } = this.props;
		if (e.key === 'Enter') {
			history.push(`/search/${this.state.searchInput}`);
		}
	}
	// _fetchMatchingDataToSearchInput2(location) {
	// 	fetch(`http://localhost:3002/api/restaurants?district=${location}`).then((res) => res.json()).then((json) => {
	// 		console.log(json);
	// 		this.setState({
	// 			searchResult: json
	// 		});
	// 	});
	// }

	_getAddressOfCurrentLocation(lat, lon) {
		console.log(config.GOOGLEMAPAPIKEY);
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLEMAPAPIKEY}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					currentLoc: json.results[0].formatted_address.slice(11, 13)
				});
			});
	}
	_triggerFetchRestaurantsNearby = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);

				this._getAddressOfCurrentLocation(position.coords.latitude, position.coords.longitude);
			},
			(error) => this.setState({ error: error })
		);
	};
	render() {
		const { reviewOfTheDay, recentActivityList, searchResult, currentLoc } = this.state;
		const { history } = this.props;
		return reviewOfTheDay && recentActivityList ? (
			<div>
				<header>
					<div>
						<button>login</button>
						<button>logout</button>
						<Search
							onChange={(e) => this._updateSearchInput(e)}
							onClick={this._triggerFetchWithClick}
							onKeyPress={(e) => this._triggerFetchWithEnter(e)}
							searchInput={this.state.searchInput}
						/>
						<button
							onClick={() => {
								this._triggerFetchRestaurantsNearby();
								history.push(`/search/${currentLoc}`);
							}}
						>
							Current Location
						</button>
					</div>
				</header>
				{searchResult ? (
					searchResult.map((restaurant) => (
						<div>
							<span>
								<img src={restaurant.photo} alt={restaurant.name} />
							</span>
							<span>
								<div>{restaurant.name}</div>
								<div>별점</div>
								<div>comment::: {restaurant.reviewID}</div>
							</span>
						</div>
					))
				) : null}
				<LocationRecommendation />
				<TodayReview reviewOfTheDay={reviewOfTheDay} />
				<RecentActivity recentActivityList={recentActivityList} />
				{/* <Footer /> */}
			</div>
		) : (
			<div>getting info...</div>
		);
	}
}

export default Main;
