import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";

const app = express();

//배포 시에는 끌 것
app.use(cors());