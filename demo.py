import cv2
import numpy as np
import matplotlib.pyplot as plt
from keras.src.models import model
from skimage.feature import local_binary_pattern
from skimage.filters import gabor
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from compare_image import *

# Hàm để hiển thị ảnh bằng matplotlib
def show_image(image, title="Image", cmap='gray'):
    plt.imshow(image, cmap=cmap)
    plt.title(title)
    plt.axis('off')
    plt.show()

# === Bước 1: Tiền Xử Lý Hình Ảnh ===
def apply_gaussian_blur(image):
    return cv2.GaussianBlur(image, (5, 5), 0)

def apply_histogram_equalization(image):
    image_yuv = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)
    image_yuv[:, :, 0] = cv2.equalizeHist(image_yuv[:, :, 0])
    equalized_image = cv2.cvtColor(image_yuv, cv2.COLOR_YUV2BGR)
    return equalized_image

def apply_Convert_to_HSV_color_space (image):
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    return hsv_image

# === Bước 2: Phân Đoạn Hình Ảnh ===
def otsu_thresholding(hsv_image):
    gray_image = cv2.cvtColor(hsv_image, cv2.COLOR_BGR2GRAY)
    _, thresh_otsu = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return thresh_otsu

def canny_edge_detection(hsv_image, low_threshold=100, high_threshold=200):
    gray_image = cv2.cvtColor(hsv_image, cv2.COLOR_BGR2GRAY)
    return cv2.Canny(gray_image, low_threshold, high_threshold)

def watershed_segmentation(hsv_image, thresh_otsu):

    ret, markers = cv2.connectedComponents(thresh_otsu)
    markers = markers + 1
    markers[thresh_otsu == 255] = 0
    watershed_image = cv2.watershed(hsv_image, markers)
    # hsv_image[watershed_image == -1] = [255, 0, 0]
    return watershed_image

# === Bước 3: Trích Xuất Đặc Trưng ===
def extract_color_histogram(hsv_image):
    # Trích xuất histogram màu
    hist_b = cv2.calcHist([hsv_image], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([hsv_image], [1], None, [256], [0, 256])
    hist_r = cv2.calcHist([hsv_image], [2], None, [256], [0, 256])

    return hist_b, hist_g, hist_r

def extract_shape_features(thresh_otsu):
    # Trích xuất đặc trưng hình dạng (diện tích và chu vi)
    contours, _ = cv2.findContours(thresh_otsu, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    shape_features = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        perimeter = cv2.arcLength(cnt, True)
        shape_features.append([area, perimeter])

    return shape_features

def extract_Local_Binary_Pattern(hsv_image):
    # Trích xuất đặc trưng kết cấu bằng LBP (Local Binary Pattern)
    gray_image = cv2.cvtColor(hsv_image, cv2.COLOR_BGR2GRAY)
    lbp = local_binary_pattern(gray_image, 8, 1, method="uniform")

    return lbp

# ham ket hop cac dac trung thanh 1 vector dac trung duy nhat
def Combine_all_features_into_a_single_feature_vector (hist_b, hist_g, hist_r, shape_features, lbp) :
    features = np.hstack(
        [hist_b.flatten(), hist_g.flatten(), hist_r.flatten(), np.array(shape_features).flatten(), lbp.flatten()])

    return  features



def extract_texture_features_lbp(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    lbp = local_binary_pattern(gray_image, 8, 1, method="uniform")
    (hist, _) = np.histogram(lbp.ravel(), bins=np.arange(0, 10), range=(0, 9))
    hist = hist.astype("float")
    hist /= hist.sum()
    return hist

# Hàm padding để đảm bảo tất cả đặc trưng có cùng kích thước
def pad_features(features, target_size):
    padded_features = np.zeros((target_size,))
    features = np.array(features)
    padded_features[:len(features)] = features
    return padded_features

# === Bước 4: Phân loại ảnh sử dụng mô hình học máy với SVM ===
    # Hàm phân loại SVM
def svm_classification(features, labels):
    # Chia dữ liệu thành tập huấn luyện và tập kiểm tra
    features = np.array([...])  # Thay thế bằng đặc trưng thực sự
    labels = np.array([...])  # Thay thế bằng nhãn thực sự

    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

    # Huấn luyện SVM
    svm = SVC(kernel='linear')
    svm.fit(X_train, y_train)

    # Dự đoán và đánh giá
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Dộ chính xác của mô hình: {accuracy}')


# Bước 1, 2 và 3: Đọc, tiền xử lý và trích xuất đặc trưng cho từng ảnh
def main():
    image_paths = ['1.jpg', '2.jpg', '3.jpg', 'ISIC_0000025.jpg', 'ISIC_0000050.jpg',
                   'skin_lesion.jpg']  # Danh sách ảnh đầu vào
    all_features = []
    labels = []
    max_feature_length = 0  # Để tìm độ dài đặc trưng lớn nhất

    for idx, image_path in enumerate(image_paths):
        image = cv2.imread(image_path)

        if image is None:
            print(f"Cannot process {image_path}: Invalid image.")
            continue

        # Tiền xử lý ảnh
        gaussian_blur = apply_gaussian_blur(image)
        equalized_image = apply_histogram_equalization(gaussian_blur)
        hsv_image = apply_Convert_to_HSV_color_space(equalized_image)

        # Phân đoạn
        thresh_otsu = otsu_thresholding(hsv_image)
        canny_edges = canny_edge_detection(hsv_image)
        watershed_image = watershed_segmentation(hsv_image.copy(), thresh_otsu)

        # # Trích xuất đặc trưng
        hist_b, hist_g, hist_r = extract_color_histogram(hsv_image)
        shape_features = extract_shape_features(thresh_otsu)
        lbp = extract_Local_Binary_Pattern(hsv_image)
        # kết hợp đặc trưng
        features = Combine_all_features_into_a_single_feature_vector(hist_b, hist_g, hist_r, shape_features, lbp)
        # trich suat dac trung se trich suat dac trung cua anh theo dang vector roi ket hop thanh 1 vector cu the

        # Cập nhật kích thước đặc trưng lớn nhất
        if len(features) > max_feature_length:
            max_feature_length = len(features)

        all_features.append(features)

        # Nhãn giả sử (có thể thay thế bằng nhãn thực tế)
        labels.append(0 if idx % 2 == 0 else 1)  # 0: No Cancer, 1: Cancer

        # Padding các đặc trưng để có cùng kích thước
    padded_features = [pad_features(f, max_feature_length) for f in all_features]

    if len(padded_features) > 0:
        padded_features = np.array(padded_features)
        labels = np.array(labels)
        predictions = svm_classification(padded_features, labels)

        for i, image_path in enumerate(image_paths):
            print(f"Prediction for image {image_path}: {'Cancer' if predictions[i] == 1 else 'No Cancer'}")
    else:
        print("No valid images found to process.")

    

main()