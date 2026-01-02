// src/utils/actionCable.js (O donde manejes tu lógica de Action Cable)
import { createConsumer, logger } from "@rails/actioncable";
import Cookies from "js-cookie";

logger.enabled = false;
const deviceId= Cookies.get("device_id");
const cableUrl = `${process.env.NEXT_PUBLIC_PLAYER_RAILS_ACTION_CABLE_URL}?device_id=${deviceId}` || `ws://ws-adonplay.local/cable?device_id_id=${deviceId}`;
const cable = createConsumer(cableUrl);
export default cable;

