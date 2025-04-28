import { Songs } from "../models/songs.model.js";
import { Album } from "../models/album.model.js";

import cloudinary from "../lib/cloudinary.js";

//helper function for coudinary uploads
const uploadCoudinary = async (file) => {
  try {
    const result = cloudinary.uploader.upload(file, tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploding to cloudinary ", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.file || !req.file.audioFile || !req.file.imageFile) {
      return res.status(400).json({
        message: "Please upload both audio and image file",
        success: false,
      });
    } else {
      const { title, artist, duration, albumId } = req.body;
      const audioFile = req.file.audioFile;
      const imageFile = req.file.imageFile;

      const audioUrl = await uploadCoudinary(audioFile);

      const imageUrl = await uploadCoudinary(imageFile);

      const song = new Songs({
        title,
        artist,
        duration,
        albumId: albumId ? albumId : null,
        audioUrl,
        imageUrl,
      });

      await song.save();

      //if song belog to album update album
      if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
          $push: { songs: song._id },
        });
      }

      res
        .status(200)
        .json({ message: "Song created successfully", success: true, song });
    }
  } catch (error) {
    console.log("error in cretion of song");
    console.log(error);
    next(next);
  }
};


export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
};



export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};

