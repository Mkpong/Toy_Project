import cv2
import numpy as np
import matplotlib.pyplot as plt
import pytesseract

img_ori = cv2.imread('near2.jpg')

# 이진화
_, threshold = cv2.threshold(img_ori, 127, 255, cv2.THRESH_BINARY)

# 구조화 요소 생성 (사각형 형태, 크기 조정 가능)
kernel = np.ones((3, 3), np.uint8)

# # 침식 수행
# img_ori = cv2.erode(threshold, kernel, iterations=2)

# # 결과 출력
# cv2.imshow("Original Image", img_ori)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

height, width, channel = img_ori.shape

plt.figure(figsize=(20,20))
plt.imshow(img_ori, cmap='gray')

# cv2.imshow("Image", img_ori)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
print(height, width, channel)

# RGB to Gray
gray = cv2.cvtColor(img_ori , cv2.COLOR_BGR2GRAY)
cv2.imshow("GRAY", gray)
cv2.waitKey(0)
cv2.destroyAllWindows()

# GaussianBlur
img_blurred = cv2.GaussianBlur(gray, ksize=(5,5) , sigmaX=0)

# Threshold
img_blur_thresh = cv2.adaptiveThreshold(
    img_blurred,
    maxValue=255.0,
    adaptiveMethod=cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    thresholdType=cv2.THRESH_BINARY_INV,
    blockSize=19,
    C=9
)
img_thresh = cv2.adaptiveThreshold(
    gray,
    maxValue=255.0,
    adaptiveMethod=cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    thresholdType=cv2.THRESH_BINARY_INV,
    blockSize=19,
    C=9
)

cv2.imshow("IMage" , img_blur_thresh)
cv2.waitKey(0)
cv2.destroyAllWindows()

#Contours
contours, _ = cv2.findContours(
    img_blur_thresh,
    mode=cv2.RETR_LIST,
    method=cv2.CHAIN_APPROX_SIMPLE
)

temp_result = np.zeros((height, width, channel) , dtype=np.uint8)
cv2.drawContours(temp_result, contours=contours, contourIdx=-1, color=(255,255,255))

print_image = temp_result
cv2.imshow("contours" , temp_result)
cv2.waitKey(0)
cv2.destroyAllWindows()

#Rectangle
temp_result = np.zeros((height, width, channel) , dtype=np.int8)
contours_dict = []
for contour in contours:
    x,y,w,h = cv2.boundingRect(contour)
    cv2.rectangle(temp_result, pt1=(x,y) , pt2=(x+w, y+h) , color=(255,255,255) , thickness=2)
    
    contours_dict.append({
        'contour':contour,
        'x':x,
        'y':y,
        'w':w,
        'h':h,
        'cx':x+(w/2),
        'cy':y+(h/2)
    })
    
cv2.imshow("Rectangle1" , temp_result)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 후보 추려내기1
MIN_AREA = 80
MIN_WIDTH, MIN_HEIGHT=2, 8
MIN_RATIO, MAX_RATIO = 0.15, 1.0

possible_contours = []

cnt = 0
for d in contours_dict:
    area = d['w'] * d['h']
    ratio = d['w'] / d['h']
    
    if area > MIN_AREA \
    and d['w'] > MIN_WIDTH and d['h'] > MIN_HEIGHT \
    and MIN_RATIO < ratio < MAX_RATIO:
        d['idx'] = cnt
        cnt += 1
        possible_contours.append(d)

temp_result = np.zeros((height, width, channel), dtype = np.uint8)

for d in possible_contours:
    cv2.rectangle(temp_result, pt1=(d['x'], d['y']), pt2=(d['x']+d['w'], d['y']+d['h']), color=(255, 255, 255), thickness=2)
    
cv2.imshow("check1" , temp_result)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 후보 추려내기 2
MAX_DIAG_MULTIPLYER = 5
MAX_ANGLE_DIFF = 12.0
MAX_AREA_DIFF = 0.5
MAX_WIDTH_DIFF = 0.8
MAX_HEIGHT_DIFF = 0.2
MIN_N_MATCHED = 3

def find_chars(contour_list):
    matched_result_idx = []
    
    for d1 in contour_list:
        matched_contours_idx = []
        for d2 in contour_list:
            if d1['idx'] == d2['idx']:
                continue
                
            dx = abs(d1['cx'] - d2['cx'])
            dy = abs(d1['cy'] - d2['cy'])
            
            diagonal_length1 = np.sqrt(d1['w'] ** 2 + d1['h'] ** 2)
            
            distance = np.linalg.norm(np.array([d1['cx'], d1['cy']]) - np.array([d2['cx'], d2['cy']]))
            if dx == 0:
                angle_diff = 90
            else:
                angle_diff = np.degrees(np.arctan(dy / dx))
            area_diff = abs(d1['w'] * d1['h'] - d2['w'] * d2['h']) / (d1['w'] * d1['h'])
            width_diff = abs(d1['w'] - d2['w']) / d1['w']
            height_diff = abs(d1['h'] - d2['h']) / d1['h']
            
            if distance < diagonal_length1 * MAX_DIAG_MULTIPLYER \
            and angle_diff < MAX_ANGLE_DIFF and area_diff < MAX_AREA_DIFF \
            and width_diff < MAX_WIDTH_DIFF and height_diff < MAX_HEIGHT_DIFF:
                matched_contours_idx.append(d2['idx'])
                
        matched_contours_idx.append(d1['idx'])
        
        if len(matched_contours_idx) < MIN_N_MATCHED:
            continue
        matched_result_idx.append(matched_contours_idx)
        
        unmatched_contour_idx = []
        for d4 in contour_list:
            if d4['idx'] not in matched_contours_idx:
                unmatched_contour_idx.append(d4['idx'])
        
        unmatched_contour = np.take(possible_contours, unmatched_contour_idx)
        
        recursive_contour_list = find_chars(unmatched_contour)
        
        for idx in recursive_contour_list:
            matched_result_idx.append(idx)
            
        break
        
    return matched_result_idx

result_idx = find_chars(possible_contours)

matched_result = []
for idx_list in result_idx:
    matched_result.append(np.take(possible_contours, idx_list))
    
temp_result = np.zeros((height, width, channel), dtype=np.uint8)

for r in matched_result:
    for d in r:
        cv2.rectangle(temp_result, pt1=(d['x'], d['y']), pt2=(d['x']+d['w'], d['y']+d['h']), color=(255,255,255), thickness=1)

cv2.imshow("check2" , temp_result)
cv2.waitKey(0)
cv2.destroyAllWindows()

# 겹치는 사각형 제거하기

def remove_inner_rectangles(rectangles):
    result = []
    for i in rectangles:
        for j, mainR in enumerate(i):
            x1, y1, w1, h1 = mainR['x'] , mainR['y'], mainR['w'] ,mainR['h']
            is_inner = False
            for k, subR in enumerate(i):
                if j!=k:
                    x2, y2, w2, h2 = subR['x'], subR['y'], subR['w'], subR['h']
                    if x2 <= x1 and y2 <= y1 and (x2 + w2) >= (x1 + w1) and (y2 + h2) >= (y1 + h1):
                        is_inner = True
                        break
            if not is_inner:
                result.append(mainR)
    print("ResultSize : " , len(result))
    return result

test = remove_inner_rectangles(matched_result)
final_result = []
final_result.append(test)

for r in final_result:
    for d in r:
        cv2.rectangle(img_blur_thresh, pt1=(d['x'], d['y']), pt2=(d['x']+d['w'], d['y']+d['h']), color=(255,255,255), thickness=1)

cv2.imshow("final" , img_blur_thresh)
cv2.waitKey(0)
cv2.destroyAllWindows()

# for r in final_result:
#     for d in r:
#         x, y, w, h = d['x'], d['y'], d['w'], d['h']
#         cropped_image = print_image[y:y+h, x:x+w]
#         # 추출된 영역을 원하는 경로에 저장하거나 추가적인 처리를 수행할 수 있습니다.
#         cv2.imshow("rrrrrrr" , cropped_image)
#         cv2.waitKey(0)
#         cv2.destroyAllWindows()





# # 정방향으로 돌리기

# PLATE_WIDTH_PADDING = 1.3 # 1.3
# PLATE_HEIGHT_PADDING = 1.5 # 1.5
# MIN_PLATE_RATIO = 3
# MAX_PLATE_RATIO = 10

# plate_imgs = []
# plate_infos = []

# for i, matched_chars in enumerate(matched_result):
#     sorted_chars = sorted(matched_chars, key=lambda x: x['cx'])

#     plate_cx = (sorted_chars[0]['cx'] + sorted_chars[-1]['cx']) / 2
#     plate_cy = (sorted_chars[0]['cy'] + sorted_chars[-1]['cy']) / 2
    
#     plate_width = (sorted_chars[-1]['x'] + sorted_chars[-1]['w'] - sorted_chars[0]['x']) * PLATE_WIDTH_PADDING
    
#     sum_height = 0
#     for d in sorted_chars:
#         sum_height += d['h']

#     plate_height = int(sum_height / len(sorted_chars) * PLATE_HEIGHT_PADDING)
    
#     triangle_height = sorted_chars[-1]['cy'] - sorted_chars[0]['cy']
#     triangle_hypotenus = np.linalg.norm(
#         np.array([sorted_chars[0]['cx'], sorted_chars[0]['cy']]) - 
#         np.array([sorted_chars[-1]['cx'], sorted_chars[-1]['cy']])
#     )
    
#     angle = np.degrees(np.arcsin(triangle_height / triangle_hypotenus))
    
#     rotation_matrix = cv2.getRotationMatrix2D(center=(plate_cx, plate_cy), angle=angle, scale=1.0)
    
#     img_rotated = cv2.warpAffine(img_thresh, M=rotation_matrix, dsize=(width, height))
    
#     img_cropped = cv2.getRectSubPix(
#         img_rotated, 
#         patchSize=(int(plate_width), int(plate_height)), 
#         center=(int(plate_cx), int(plate_cy))
#     )
    
#     if img_cropped.shape[1] / img_cropped.shape[0] < MIN_PLATE_RATIO or img_cropped.shape[1] / img_cropped.shape[0] < MIN_PLATE_RATIO > MAX_PLATE_RATIO:
#         continue
    
#     plate_imgs.append(img_cropped)
#     plate_infos.append({
#         'x': int(plate_cx - plate_width / 2),
#         'y': int(plate_cy - plate_height / 2),
#         'w': int(plate_width),
#         'h': int(plate_height)
#     })
    
#     cv2.imshow("Imagexx" , img_cropped)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()
    

# #Restart

# contours, _ = cv2.findContours(
#     img_cropped,
#     mode=cv2.RETR_LIST,
#     method=cv2.CHAIN_APPROX_SIMPLE
# )

# temp_result = np.zeros((height, width, channel) , dtype=np.uint8)
# cv2.drawContours(temp_result, contours=contours, contourIdx=-1, color=(255,255,255))

# cv2.imshow("IMage" , temp_result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# #Rectangle
# temp_result = np.zeros((height, width, channel) , dtype=np.int8)
# contours_dict = []
# for contour in contours:
#     x,y,w,h = cv2.boundingRect(contour)
#     cv2.rectangle(temp_result, pt1=(x,y) , pt2=(x+w, y+h) , color=(255,255,255) , thickness=2)
    
#     contours_dict.append({
#         'contour':contour,
#         'x':x,
#         'y':y,
#         'w':w,
#         'h':h,
#         'cx':x+(w/2),
#         'cy':y+(h/2)
#     })
    
# cv2.imshow("IMage" , temp_result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# # 후보 추려내기1
# MIN_AREA = 80
# MIN_WIDTH, MIN_HEIGHT=2, 8
# MIN_RATIO, MAX_RATIO = 0.15, 1.0

# possible_contours = []

# cnt = 0
# for d in contours_dict:
#     area = d['w'] * d['h']
#     ratio = d['w'] / d['h']
    
#     if area > MIN_AREA \
#     and d['w'] > MIN_WIDTH and d['h'] > MIN_HEIGHT \
#     and MIN_RATIO < ratio < MAX_RATIO:
#         d['idx'] = cnt
#         cnt += 1
#         possible_contours.append(d)

# temp_result = np.zeros((height, width, channel), dtype = np.uint8)

# for d in possible_contours:
#     cv2.rectangle(temp_result, pt1=(d['x'], d['y']), pt2=(d['x']+d['w'], d['y']+d['h']), color=(255, 255, 255), thickness=2)
    
# cv2.imshow("IMage" , temp_result)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

    
# 10 , #11
# longest_idx, longest_text = -1, 0
# plate_chars = []

# for i, plate_img in enumerate(plate_imgs):
#     plate_img = cv2.resize(plate_img, dsize=(0, 0), fx=1.6, fy=1.6)
#     _, plate_img = cv2.threshold(plate_img, thresh=0.0, maxval=255.0, type=cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    
#     # find contours again (same as above)
#     contours, _ = cv2.findContours(plate_img, mode=cv2.RETR_LIST, method=cv2.CHAIN_APPROX_SIMPLE)
    
#     plate_min_x, plate_min_y = plate_img.shape[1], plate_img.shape[0]
#     plate_max_x, plate_max_y = 0, 0

#     for contour in contours:
#         x, y, w, h = cv2.boundingRect(contour)
        
#         area = w * h
#         ratio = w / h

#         if area > MIN_AREA \
#         and w > MIN_WIDTH and h > MIN_HEIGHT \
#         and MIN_RATIO < ratio < MAX_RATIO:
#             if x < plate_min_x:
#                 plate_min_x = x
#             if y < plate_min_y:
#                 plate_min_y = y
#             if x + w > plate_max_x:
#                 plate_max_x = x + w
#             if y + h > plate_max_y:
#                 plate_max_y = y + h
                
#     img_result = plate_img[plate_min_y:plate_max_y, plate_min_x:plate_max_x]
    
#     img_result = cv2.GaussianBlur(img_result, ksize=(3, 3), sigmaX=0)
#     _, img_result = cv2.threshold(img_result, thresh=0.0, maxval=255.0, type=cv2.THRESH_BINARY | cv2.THRESH_OTSU)
#     img_result = cv2.copyMakeBorder(img_result, top=10, bottom=10, left=10, right=10, borderType=cv2.BORDER_CONSTANT, value=(0,0,0))
    
#     pytesseract.pytesseract.tesseract_cmd = 'C:/tesseract/tesseract.exe'
#     chars = pytesseract.image_to_string(img_result, lang='kor', config='--psm 7 --oem 0')
    
#     result_chars = ''
#     has_digit = False
#     for c in chars:
#         if ord('가') <= ord(c) <= ord('힣') or c.isdigit():
#             if c.isdigit():
#                 has_digit = True
#             result_chars += c
    
#     print(result_chars)
#     plate_chars.append(result_chars)

#     if has_digit and len(result_chars) > longest_text:
#         longest_idx = i

#     plt.subplot(len(plate_imgs), 1, i+1)
#     plt.imshow(img_result, cmap='gray')