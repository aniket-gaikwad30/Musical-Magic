import { Songs } from "../models/songs.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for Cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

// Create a new song
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Please upload audio and image files" });
    }

    const { title, artist, albumId, duration } = req.body;

    if (!title || !artist || !duration) {
      return res.status(400).json({ message: "Missing required song fields" });
    }

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Songs({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // If song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }, // ✅ fixed field name
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};

// Delete a song by ID
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Songs.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // If song belongs to an album, remove it from the album
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }, 
      });
    }

    await Songs.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
};

// Create a new album
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;

    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload an album image" });
    }

    if (!title || !artist || !releaseYear) {
      return res.status(400).json({ message: "Missing album fields" });
    }

    const imageFile = req.files.imageFile;
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

// Delete an album and its songs
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Songs.deleteMany({ albumId: id }); // ✅ fixed model name
    await Album.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Album and its songs deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

// Dummy checkAdmin route
export const checkAdmin = async (req, res, next) => {
  console.log("in checkAdmin");
  res.status(200).json({ admin: true });
};
