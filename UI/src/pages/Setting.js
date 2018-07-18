import React, { Component } from 'react';
import '../resources/css/style.css';
import '../assets/plugins/bootstrap/css/bootstrap.min.css';
import '../resources/css/sj-style.css';
import '../resources/css/colors/blue.css';
import Footer from '../layouts/Footer';

class Setting extends Component {
    render() {
        return (
            /*
            <div class="row">
                <div class="col-12 m-t-30">
                    <h4 class="m-b-0">설정 관심분야</h4>
                    <p class="text-muted m-t-0">추천 채팅방은 아래와 같습니다. 채팅방 선택시 입장 가능합니다.</p>
                    <div class="card">
                        <div class="card-body">
                            <h4>동물, 10km</h4>
                            <button type="button" class="btn waves-effect waves-light btn-primary" data-toggle="modal" data-target="#myModal" >설정</button>
                        </div>
                    </div>

                    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="myModalLabel">채팅방 개설</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body">
                                    <h5>위치설정</h5>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="box-label">동물, 10km</div>
                                            <button type="button" class="btn waves-effect waves-light btn-primary" data-toggle="modal" data-target="#myModal" >내 위치 다시 설정</button>
                                        </div>
                                    </div>
                                    <h5>관심분야</h5>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="message-box contact-box">
                                                <div class="message-widget contact-widget">
                                                    <a href="#">
                                                        <div class="row">
                                                            <div class="col-md-5 col-8 align-self-center">
                                                                <div class="mail-contnet">
                                                                    <h5>반려동물</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info waves-effect" data-dismiss="modal">채팅방 개설하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="m-b-0">채팅방 목록</h4>
                    <p class="text-muted m-t-0">추천 채팅방은 아래와 같습니다. 채팅방 선택시 입장 가능합니다.</p>
                    <div class="card">
                        <div class="card-body">
                            <div class="message-box contact-box">
                                <div class="message-widget contact-widget">
                                    <a href="./f8-roominfo.html">
                                        <div class="row">
                                            <div class="col-md-5 col-8 align-self-center">
                                                <div class="user-img">
                                                    <img src="../assets/images/users/1.jpg" alt="user" class="img-circle"> <span class="profile-status offline pull-right"></span></img>
                                                </div>
                                                <div class="mail-contnet">
                                                    <h5>다함께 놀아요!</h5> <span class="mail-desc">David chicken</span>
                                                    <span class="badge badge-info">반려동물</span>
                                                    <span class="badge badge-warning">최대 10</span>
                                                </div>
                                            </div>
                                            <div class="col-md-7 col-4 align-self-center d-flex m-t-10 justify-content-end">
                                                <button type="button" class="btn waves-effect waves-light btn-lg btn-primary" formaction="./f8-roominfo.html">Join</button>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="row">
                                            <div class="col-md-5 col-8 align-self-center">
                                                <div class="user-img">
                                                    <img src="../assets/images/users/2.jpg" alt="user" class="img-circle"> <span class="profile-status online pull-right"></span></img>
                                                </div>
                                                <div class="mail-contnet">
                                                    <h5>1+1 먹으러 갑시다</h5> <span class="mail-desc">Sonu Nigam</span>
                                                    <span class="badge badge-info">맛집</span>
                                                    <span class="badge badge-warning">2명 제한</span>
                                                </div>
                                            </div>
                                            <div class="col-md-7 col-4 align-self-center d-flex m-t-10 justify-content-end">
                                                <button type="button" class="btn waves-effect waves-light btn-lg btn-primary">Join</button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-muted m-t-0">검색결과가 존재하지 않습니다. <br />관심분야 혹은 위치 및 범위를 변경 해보세요.
                    </p>
                </div>
            </div>
            */
           <div>
               <Footer/>
            </div>
        );
    }
}

export default Setting;