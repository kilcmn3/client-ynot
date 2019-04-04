import React from 'react';

function TodayReview({ reviewOfTheDay }) {
	// console.log('review::: ', reviewOfTheDay);
	return (
		<div>
			<div>userName</div>
			<div>REVIEW OF THE DAY!</div>
			<div>
				<span>{reviewOfTheDay[0].rating}</span>
				<span>{reviewOfTheDay[0].date}</span>
			</div>
			<div>{reviewOfTheDay[0].comment}</div>
		</div>
	);
}

export default TodayReview;
