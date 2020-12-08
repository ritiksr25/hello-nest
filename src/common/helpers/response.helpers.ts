export class ResponseHelpers {
	public sendSuccess(data) {
		return {
			error: false,
			message: "success",
			data
		};
	}
}
