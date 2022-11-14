import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Recorder from 'recorder-js';
import { BehaviorSubject } from 'rxjs';

declare var MediaRecorder: any;


@Injectable({
    providedIn: 'root'
})
export class AudioService {
    blobFile: any;
    audioContext = new (AudioContext)({ sampleRate: 16000 });
    recorder = new Recorder(this.audioContext, {});
    dataURItoBlob: any;

    constructor(private http: HttpClient) { }

    recordAudio = () => {
        return new Promise(resolve => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'audio/webm',
                        numberOfAudioChannels: 1,
                        audioBitsPerSecond: 16000,
                    });
                    let audioChunks: any = [];

                    mediaRecorder.addEventListener("dataavailable", (event: any) => {
                        audioChunks.push(event.data);
                    });

                    const start = () => {
                        mediaRecorder.start();
                    };

                    const stop = () => {
                        return new Promise(resolve => {
                            mediaRecorder.addEventListener('stop', () => {
                                const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav; codecs=MS_PCM' });
                                const reader = new FileReader();
                                reader.readAsDataURL(audioBlob);
                                reader.addEventListener('load', () => {
                                    const base64data = reader.result;
                                }, false);
                                const audioUrl = URL.createObjectURL(audioBlob);
                                console.log('Audiourl', audioUrl);
                                const audio = new Audio(audioUrl);
                                const play = () => {
                                    audio.play();
                                };
                                resolve({ audioBlob, audioUrl, play });
                            });

                            mediaRecorder.stop();
                        });
                    };
                    resolve({ start, stop });
                });
        });
    };


    async startPlay() {
        this.recorder = await this.recordAudio();
        this.recorder.start();
    }

    async stopPlay() {
        const audio = await this.recorder.stop();
        audio.play();
        return audio.audioBlob;
    }

    playFromUrl(audioUrl) {
        this.recorder = new Audio(audioUrl);
        this.recorder.play();
    }

    durationFromUrl(audioUrl) {
        const track = new Audio(audioUrl);
        return Math.floor(track.duration);
    }


    stopFromUrl() {
        this.recorder.pause();
        this.recorder.currentTime = 0;
    }
}
