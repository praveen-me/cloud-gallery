const initState = {
	images: []
}

export default function imgReducer(state = initState, action) {
	switch (action.type) {
		case 'GET_IMAGE_SUCCESS': {
			return {
				...state,
				images: action.image
			}
		}

		case 'GET_IMAGES_OF_USER': {
			return {
				...state,
				images: action.user.images
			}
		}
				
		default:
			return state;
	}
}