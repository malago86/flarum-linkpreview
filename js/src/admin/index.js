import app from "flarum/app";
import LinkPreviewPage from "./components/LinkPreviewPage";

app.initializers.add('malago/linkpreview', () => {
    app.extensionData
        .for("malago-linkpreview")
        .registerPage(LinkPreviewPage);
});