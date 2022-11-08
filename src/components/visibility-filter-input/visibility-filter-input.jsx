import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
	return (
		<input
			onChange={(e) => props.setFilter(e.target.value)}
			value={props.visibilityFilter}
			placeholder="Search by movie title:"
		/>
	);
}

export default connect(null, { setFilter })(VisibilityFilterInput);
