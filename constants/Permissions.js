import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

class HobeePermissions {
	async getLocationPermission() {
		const { status } = await Permissions.getAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			return this.askLocationPermission();
		}
	}

	async askLocationPermission() {
		const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			return true;
		} else {
			Alert.alert('Allow Hobee to find your location from your phone settings');
		}
	}

	async getCameraPermission() {
		const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
		if (status !== 'granted') {
			return this.askCameraPermission();
		}
	}

	async askCameraPermission() {
		const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		if (status === 'granted') {
			return true;
		} else {
			Alert.alert('Allow Hobee to upload your photos from your phone settings');
		}
	}

	async getNotificationsPermission() {
		const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		if (status !== 'granted') {
			return this.askNotificationsPermission();
		}
	}

	async askNotificationsPermission() {
		const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
		if (status === 'granted') {
			return true;
		} else {
			Alert.alert('Allow Hobee to send you notifications from your phone settings');
		}
	}
}

export {
	HobeePermissions
}
