import torch
import yaml
from pathlib import Path
from PIL import Image
from models.experimental import attempt_load
from utils.general import check_img_size, non_max_suppression, scale_coords
from utils.plots import plot_one_box

# YOLOv5 모델 로드
model_path = 'path/to/yolov5s.yaml'
weights_path = 'path/to/best.pt'
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = attempt_load(weights_path, map_location=device)  # 가중치 로드
stride = int(model.stride.max())  # 모델의 stride 찾기

# YOLOv5 모델 설정
with open(model_path) as f:
    yaml_data = yaml.load(f, Loader=yaml.FullLoader)
nc = yaml_data['nc']  # 클래스 수 가져오기
names = yaml_data['names']  # 클래스 이름 가져오기
imgsz = check_img_size(640, s=stride)  # 이미지 크기 설정

# 이미지 로드
image_path = 'path/to/img1.jpg'
img = Image.open(image_path).convert('RGB')
img_tensor = torch.from_numpy(np.array(img)).to(device).float()
img_tensor /= 255.0  # 이미지 픽셀 값을 0에서 1로 정규화
img_tensor = img_tensor.unsqueeze(0)  # 배치 차원 추가

# 추론
model.eval()
with torch.no_grad():
    pred = model(img_tensor)

# 검출 결과 가져오기
pred = non_max_suppression(pred, 0.4, 0.5)  # confidence threshold와 IoU threshold 조정 가능

# 결과 시각화
if len(pred[0]) > 0:
    pred[0][:, :4] = scale_coords(img_tensor.shape[2:], pred[0][:, :4], img.size).round()
    for *xyxy, conf, cls in pred[0]:
        plot_one_box(xyxy, img, label=names[int(cls)], color=(0, 255, 0))  # 검출된 객체에 박스 및 라벨 표시

# 결과 이미지 저장
output_path = 'path/to/output.jpg'
img.save(output_path)
print(f'추론 결과가 {output_path}에 저장되었습니다.')
