"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudyRoomMeet = void 0;
const https_1 = require("firebase-functions/v2/https");
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const CALENDAR_ID_ENV = "CALENDAR_ID";
const CREDENTIALS_ENV = "CALENDAR_CREDENTIALS_JSON";
function getCalendarId() {
    const id = process.env[CALENDAR_ID_ENV];
    return id && id.trim() ? id.trim() : "primary";
}
function getCredentials() {
    const raw = process.env[CREDENTIALS_ENV];
    if (!raw || !raw.trim()) {
        throw new https_1.HttpsError("failed-precondition", "Calendar API credentials not configured. Set CALENDAR_CREDENTIALS_JSON (service account JSON string) and CALENDAR_ID in Firebase config or environment.");
    }
    try {
        const parsed = JSON.parse(raw);
        if (!parsed.client_email || !parsed.private_key) {
            throw new Error("Missing client_email or private_key in credentials JSON");
        }
        return { client_email: parsed.client_email, private_key: parsed.private_key };
    }
    catch (e) {
        throw new https_1.HttpsError("invalid-argument", "CALENDAR_CREDENTIALS_JSON is invalid JSON or missing client_email/private_key.");
    }
}
async function createCalendarEventWithMeet(subjectName, calendarId, credentials) {
    var _a, _b, _c, _d, _e, _f;
    const auth = new google_auth_library_1.JWT({
        email: credentials.client_email,
        key: credentials.private_key.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    const calendar = googleapis_1.google.calendar({ version: "v3", auth });
    const now = new Date();
    const end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const event = {
        summary: subjectName,
        description: "Study room created via Sapex",
        start: {
            dateTime: now.toISOString(),
            timeZone: "UTC",
        },
        end: {
            dateTime: end.toISOString(),
            timeZone: "UTC",
        },
        conferenceData: {
            createRequest: {
                requestId: `sapex-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                conferenceSolutionKey: {
                    type: "hangoutsMeet",
                },
            },
        },
    };
    const res = await calendar.events.insert({
        calendarId,
        requestBody: event,
        conferenceDataVersion: 1,
    });
    const data = res.data;
    const hangoutLink = (_e = (_d = (_c = (_b = (_a = data.conferenceData) === null || _a === void 0 ? void 0 : _a.entryPoints) === null || _b === void 0 ? void 0 : _b.find((e) => e.entryPointType === "video")) === null || _c === void 0 ? void 0 : _c.uri) !== null && _d !== void 0 ? _d : data.hangoutLink) !== null && _e !== void 0 ? _e : "";
    if (!hangoutLink) {
        throw new https_1.HttpsError("internal", "Calendar API did not return a Meet link. Ensure the calendar is eligible for Google Meet (e.g. Google Workspace or primary calendar with Meet enabled).");
    }
    return { hangoutLink, id: (_f = data.id) !== null && _f !== void 0 ? _f : undefined };
}
exports.createStudyRoomMeet = (0, https_1.onCall)({ region: "us-central1" }, async (request) => {
    var _a, _b;
    if (!((_a = request.auth) === null || _a === void 0 ? void 0 : _a.uid)) {
        throw new https_1.HttpsError("unauthenticated", "You must be signed in to create a study room.");
    }
    const { subjectName } = (_b = request.data) !== null && _b !== void 0 ? _b : {};
    if (!subjectName || typeof subjectName !== "string" || !subjectName.trim()) {
        throw new https_1.HttpsError("invalid-argument", "subjectName is required and must be a non-empty string.");
    }
    const calendarId = getCalendarId();
    const credentials = getCredentials();
    try {
        const { hangoutLink, id } = await createCalendarEventWithMeet(subjectName.trim(), calendarId, credentials);
        return { meetLink: hangoutLink, eventId: id };
    }
    catch (err) {
        if (err instanceof https_1.HttpsError)
            throw err;
        console.error("createStudyRoomMeet error:", err);
        throw new https_1.HttpsError("internal", err instanceof Error ? err.message : "Failed to create Google Meet link.");
    }
});
//# sourceMappingURL=index.js.map