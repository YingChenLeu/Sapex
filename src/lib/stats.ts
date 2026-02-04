import { Firestore, doc, setDoc, increment } from "firebase/firestore";

/** Firestore path for the single stats document. */
export const STATS_COLLECTION = "stats";
export const STATS_DOC_ID = "usage";

export type UsageStatField =
  | "studyRoomsUsed"
  | "helpBoardUsed"
  | "wellnessSupportUsed";

/**
 * Increment a usage counter in the stats document.
 * Uses merge so the doc is created if missing and other fields are preserved.
 */
export async function incrementUsage(
  db: Firestore,
  field: UsageStatField
): Promise<void> {
  await setDoc(
    doc(db, STATS_COLLECTION, STATS_DOC_ID),
    { [field]: increment(1) },
    { merge: true }
  );
}
