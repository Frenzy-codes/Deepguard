"""
Metadata utility helpers — extracts EXIF tags and scans for AI signatures.
"""

import io
import logging
from PIL import Image, ExifTags

logger = logging.getLogger(__name__)


def extract_image_metadata(img_bytes: bytes) -> dict:
    """
    Extract EXIF metadata and check for AI generator software/prompt signatures.
    """
    try:
        image = Image.open(io.BytesIO(img_bytes))
        metadata = {
            "has_exif": False,
            "camera_make": "N/A",
            "camera_model": "N/A",
            "software": "N/A",
            "created_at": "N/A",
            "ai_tool_detected": None,
            "file_type": image.format,
            "dimensions": f"{image.width} x {image.height}",
        }

        # 1. Check PNG text metadata (e.g., Stable Diffusion prompts/parameters)
        if image.format == "PNG":
            info = image.info
            for key, val in info.items():
                key_str = str(key).lower()
                val_str = str(val).lower()
                if "parameters" in key_str or "prompt" in val_str or "stable diffusion" in val_str:
                    metadata["ai_tool_detected"] = "Stable Diffusion Metadata Signature"
                    metadata["software"] = "Stable Diffusion WebUI"
                elif "dall-e" in val_str or "dalle" in val_str:
                    metadata["ai_tool_detected"] = "DALL-E Metadata Signature"
                    metadata["software"] = "DALL-E"
                elif "midjourney" in val_str:
                    metadata["ai_tool_detected"] = "Midjourney Metadata Signature"
                    metadata["software"] = "Midjourney"

        # 2. Check JPEG/PNG EXIF metadata
        exif = image.getexif()
        if exif:
            metadata["has_exif"] = True
            for tag_id, value in exif.items():
                tag_name = ExifTags.TAGS.get(tag_id, tag_id)
                if tag_name == "Make":
                    metadata["camera_make"] = str(value).strip()
                elif tag_name == "Model":
                    metadata["camera_model"] = str(value).strip()
                elif tag_name == "Software":
                    metadata["software"] = str(value).strip()
                elif tag_name == "DateTime" or tag_name == "DateTimeOriginal":
                    metadata["created_at"] = str(value).strip()

            software = str(metadata.get("software", "")).lower()
            if "photoshop" in software:
                metadata["software"] = "Adobe Photoshop"
            elif "gimp" in software:
                metadata["software"] = "GIMP"
            elif "stable diffusion" in software or "automatic1111" in software:
                metadata["ai_tool_detected"] = "Stable Diffusion Software Tag"

        return metadata
    except Exception as e:
        logger.error("Error extracting metadata: %s", e)
        return {
            "has_exif": False,
            "camera_make": "N/A",
            "camera_model": "N/A",
            "software": "N/A",
            "created_at": "N/A",
            "ai_tool_detected": None,
            "file_type": "Unknown",
            "dimensions": "Unknown",
            "error": str(e),
        }
