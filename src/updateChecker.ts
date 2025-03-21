import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";

export async function checkForUpdates() {
  try {
    const update = await check();
    if (update) {
      console.log(`found update ${update.version} from ${update.date} with notes ${update.body}`);
      let downloaded = 0;
      let contentLength = 0;

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength ?? 0;
            console.log(`started downloading ${event.data.contentLength} bytes`);
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            console.log(`downloaded ${downloaded} from ${contentLength}`);
            break;
          case "Finished":
            console.log("download finished");
            break;
        }
      });

      console.log("update installed");
      await relaunch();
    }
  } catch (error) {
    console.error("Update check failed", error);
  }
}


export const fetchAppVersion = async () => {
  try {
    const appVersion = await getVersion()
    return appVersion;
  } catch (error) {
    console.error("Failed to fetch app version:", error);
    return 'Failed to get version'
  }
}